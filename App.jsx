import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { generateUsers, buildPosts, SUBREDDITS, seededRandom } from './data.js';

// ─── Init data (run once) ─────────────────────────────────────────────────────
const ALL_USERS = generateUsers(2000);
const USER_MAP = Object.fromEntries(ALL_USERS.map(u => [u.id, u]));
const ALL_POSTS = buildPosts(ALL_USERS);
const POST_MAP = Object.fromEntries(ALL_POSTS.map(p => [p.id, p]));
const SUB_MAP = Object.fromEntries(SUBREDDITS.map(s => [s.id, s]));

const CURRENT_USER = {
  id: 'me',
  name: 'Tamaghna_Nag',
  handle: 'Tamaghna_Nag',
  avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=TamaghnaSDE3&size=64',
  karma: 48210,
  cakeDay: 'March 15, 2019',
  isPremium: true,
  isMod: true,
  favSubs: SUBREDDITS.slice(0, 8).map(s => s.id),
};
USER_MAP['me'] = CURRENT_USER;

// ─── Utils ────────────────────────────────────────────────────────────────────
function fmtNum(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
function fmtTime(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} days ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function fmtTimeShort(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 365) return `${days}d`;
  return `${Math.floor(days / 365)}y`;
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, fill = 'none', stroke = 'currentColor', sw = 1.5, viewBox = '0 0 24 24', style = {} }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const Icons = {
  UpArrow: (p) => <Icon {...p} d="M12 19V5M5 12l7-7 7 7" />,
  DownArrow: (p) => <Icon {...p} d="M12 5v14M19 12l-7 7-7-7" />,
  Comment: (p) => <Icon {...p} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  Share: (p) => <Icon {...p} d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />,
  Bookmark: ({ filled, ...p }) => <Icon {...p} fill={filled ? 'currentColor' : 'none'} d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
  More: (p) => <Icon {...p} fill="currentColor" d="M5 12h.01M12 12h.01M19 12h.01" sw={3} />,
  Home: (p) => <Icon {...p} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />,
  Search: (p) => <Icon {...p} d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />,
  Bell: (p) => <Icon {...p} d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />,
  Plus: (p) => <Icon {...p} d="M12 5v14M5 12h14" />,
  Sun: (p) => <Icon {...p} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />,
  Moon: (p) => <Icon {...p} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  Award: (p) => <Icon {...p} d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12" />,
  Fire: (p) => <Icon {...p} d="M12 2c0 0-4 4-4 8a4 4 0 0 0 8 0c0-1.5-.5-3-1.5-4.5C14.5 7 14 9 12 9c-1 0-1.5-.75-1-1.5.5-.75 1-2 1-5.5z" fill="currentColor" />,
  New: (p) => <Icon {...p} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />,
  Top: (p) => <Icon {...p} d="M3 3h18M3 8l9 13 9-13" fill="currentColor" />,
  Link: (p) => <Icon {...p} d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />,
  Eye: (p) => <Icon {...p} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
  Trending: (p) => <Icon {...p} d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />,
  X: (p) => <Icon {...p} d="M18 6 6 18M6 6l12 12" />,
  ChevronUp: (p) => <Icon {...p} d="M18 15l-6-6-6 6" />,
  ChevronDown: (p) => <Icon {...p} d="M6 9l6 6 6-6" />,
  Reddit: (p) => <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 20 20" fill="#FF4500"><path d="M16.67 10.01c-.08 0-.16 0-.23.01a2.69 2.69 0 0 0-.63-1.42 5.78 5.78 0 0 0-4.3-1.95l.73-3.44 2.38.5a1.13 1.13 0 1 0 .15-.57L12.3 2.7l-.82 3.87a5.78 5.78 0 0 0-4.32 1.95 2.69 2.69 0 0 0-.63 1.42 2.25 2.25 0 1 0 2.44 3.7A4.44 4.44 0 0 0 10 14a4.44 4.44 0 0 0 2.03-.36 2.25 2.25 0 1 0 2.44-3.7 2.69 2.69 0 0 0 .2-1.03v-.19a.65.65 0 0 0 .02-.15 1.57 1.57 0 1 1 1.98 1.44zM8.28 11.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0zm4.44 2a2.86 2.86 0 0 1-2.72 0 .25.25 0 1 1 .24-.44 2.37 2.37 0 0 0 2.24 0 .25.25 0 1 1 .24.44zm-.22-1.25a.75.75 0 1 1 .75-.75.75.75 0 0 1-.75.75z"/></svg>,
  User: (p) => <Icon {...p} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  Edit: (p) => <Icon {...p} d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />,
  Trophy: (p) => <Icon {...p} d="M8 21h8M12 17v4M7 4h10l-1 7a5 5 0 0 1-8 0L7 4zM5 4H3l1 4a3 3 0 0 0 3 3M19 4h2l-1 4a3 3 0 0 0-3 3" />,
  Star: (p) => <Icon {...p} fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  Hash: (p) => <Icon {...p} d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />,
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ user, size = 32, onClick, style = {} }) {
  const [err, setErr] = useState(false);
  const initials = user?.name?.charAt(0)?.toUpperCase() || '?';
  const bgColors = ['#FF4500','#FF6534','#0079D3','#46D160','#7193FF','#24A0ED','#FF585B','#0DD3BB'];
  const bg = bgColors[(user?.name?.charCodeAt(0) || 0) % bgColors.length];
  return (
    <div onClick={onClick} style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, cursor: onClick ? 'pointer' : 'default', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      {!err && user?.avatarUrl ? (
        <img src={user.avatarUrl} width={size} height={size} alt="" onError={() => setErr(true)} style={{ objectFit: 'cover' }} />
      ) : (
        <span style={{ fontSize: size * 0.45, fontWeight: 700, color: '#fff' }}>{initials}</span>
      )}
    </div>
  );
}

// ─── Vote Button ──────────────────────────────────────────────────────────────
function VoteBar({ upvotes, voted, onVote, vertical = true, ratio }) {
  const displayVotes = upvotes + voted;
  const up = voted === 1;
  const down = voted === -1;
  const s = (size) => ({
    background: 'none', border: 'none', cursor: 'pointer', padding: vertical ? '2px 0' : '0 2px',
    color: up ? 'var(--upvote)' : down ? 'var(--downvote)' : 'var(--text2)',
    transition: 'color 0.15s, transform 0.1s',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  });
  return (
    <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', alignItems: 'center', gap: vertical ? 2 : 6, minWidth: vertical ? 32 : 'auto' }}>
      <button style={s()} onClick={() => onVote(up ? 0 : 1)} title="Upvote">
        <Icons.UpArrow size={16} stroke={up ? 'var(--upvote)' : 'currentColor'} sw={up ? 2.5 : 1.5} />
      </button>
      <span style={{ fontSize: 12, fontWeight: 700, color: up ? 'var(--upvote)' : down ? 'var(--downvote)' : 'var(--text2)', minWidth: vertical ? 'auto' : 24, textAlign: 'center' }}>
        {fmtNum(displayVotes)}
      </span>
      <button style={s()} onClick={() => onVote(down ? 0 : -1)} title="Downvote">
        <Icons.DownArrow size={16} stroke={down ? 'var(--downvote)' : 'currentColor'} sw={down ? 2.5 : 1.5} />
      </button>
    </div>
  );
}

// ─── Award Badge ──────────────────────────────────────────────────────────────
function Awards({ count }) {
  if (!count) return null;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, color: '#FFD700', fontWeight: 600 }}>
      <Icons.Award size={13} stroke="#FFD700" /> {count}
    </span>
  );
}

// ─── Flair Badge ──────────────────────────────────────────────────────────────
function Flair({ text, color = 'var(--accent)' }) {
  if (!text) return null;
  return (
    <span style={{ background: color + '22', color, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 2, letterSpacing: 0.3 }}>
      {text}
    </span>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────
function PostCard({ post, onOpen, compact = false }) {
  const [voted, setVoted] = useState(post.voted);
  const [saved, setSaved] = useState(post.saved);
  const author = USER_MAP[post.authorId];
  const sub = SUB_MAP[post.subId];
  if (!author || !sub) return null;

  const cardStyle = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 4,
    marginBottom: 10,
    display: 'flex',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  };

  return (
    <div style={cardStyle} onClick={() => onOpen(post.id)}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
      {/* Vote sidebar */}
      <div style={{ background: 'var(--surface2)', padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}
        onClick={e => e.stopPropagation()}>
        <VoteBar upvotes={post.upvotes} voted={voted} onVote={setVoted} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '8px 8px 8px 8px', minWidth: 0 }}>
        {/* Meta header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: sub.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{sub.icon}</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', cursor: 'pointer' }}
            onClick={e => { e.stopPropagation(); }}>
            {sub.display}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text2)' }}>• Posted by</span>
          <Avatar user={author} size={16} />
          <span style={{ fontSize: 12, color: 'var(--text2)' }}>u/{author.name}</span>
          <span style={{ fontSize: 12, color: 'var(--text2)' }}>{fmtTimeShort(post.timestamp)}</span>
          {post.flair && <Flair text={post.flair} color={sub.color} />}
          {post.isPinned && <span style={{ fontSize: 11, color: '#46D160', fontWeight: 700 }}>📌 PINNED</span>}
          {post.isLocked && <span style={{ fontSize: 11, color: 'var(--text2)' }}>🔒 LOCKED</span>}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)', lineHeight: 1.3, marginBottom: 8, fontFamily: 'IBM Plex Sans, sans-serif' }}>
          {post.title}
        </h3>

        {/* Image post preview */}
        {post.type === 'image' && !compact && (
          <div style={{ width: '100%', maxWidth: 512, height: 200, background: post.imgColor, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, marginBottom: 8, opacity: 0.85 }}>
            {post.imgEmoji}
          </div>
        )}

        {/* Text preview */}
        {post.body && !compact && (
          <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.body}
          </p>
        )}

        {/* Awards */}
        {post.awards > 0 && <div style={{ marginBottom: 6 }}><Awards count={post.awards} /></div>}

        {/* Action bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }} onClick={e => e.stopPropagation()}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 2, transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            onClick={() => onOpen(post.id)}>
            <Icons.Comment size={14} /> {fmtNum(post.commentCount)} Comments
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 2, transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <Icons.Share size={14} /> Share
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: saved ? 'var(--accent)' : 'var(--text2)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 2, transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            onClick={() => setSaved(s => !s)}>
            <Icons.Bookmark size={14} filled={saved} /> {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Thumbnail for text posts on right */}
      {post.type === 'image' && compact && (
        <div style={{ width: 92, height: 70, margin: 8, flexShrink: 0, background: post.imgColor, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>
          {post.imgEmoji}
        </div>
      )}
    </div>
  );
}

// ─── Comment Thread ───────────────────────────────────────────────────────────
function Comment({ comment, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(false);
  const [voted, setVoted] = useState(0);
  const author = USER_MAP[comment.authorId];
  if (!author) return null;
  const colors = ['#FF4500','#FF6534','#FFB000','#46D160','#0DD3BB','#0079D3','#7193FF','#FF585B'];
  const borderColor = colors[depth % colors.length];

  return (
    <div style={{ marginLeft: depth > 0 ? 20 : 0, borderLeft: depth > 0 ? `2px solid ${borderColor}22` : 'none', paddingLeft: depth > 0 ? 12 : 0, marginTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <Avatar user={author} size={24} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', cursor: 'pointer' }}>u/{author.name}</span>
            {author.isMod && <span style={{ fontSize: 10, background: '#46D16022', color: '#46D160', padding: '1px 4px', borderRadius: 2, fontWeight: 700 }}>MOD</span>}
            <span style={{ fontSize: 11, color: 'var(--text2)' }}>{fmtNum(comment.upvotes + voted)} points • {fmtTime(comment.timestamp)}</span>
            {comment.isEdited && <span style={{ fontSize: 11, color: 'var(--text2)', fontStyle: 'italic' }}>edited</span>}
            <Awards count={comment.awards} />
          </div>

          {!collapsed && (
            <>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, marginBottom: 8, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {comment.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div onClick={e => e.stopPropagation()}>
                  <VoteBar upvotes={comment.upvotes} voted={voted} onVote={setVoted} vertical={false} />
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', fontSize: 12, fontWeight: 700, padding: '2px 6px', borderRadius: 2 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  Reply
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', fontSize: 12, fontWeight: 700, padding: '2px 6px', borderRadius: 2 }}>
                  Share
                </button>
              </div>
            </>
          )}
        </div>
        <button onClick={() => setCollapsed(c => !c)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', padding: 4, flexShrink: 0 }}>
          {collapsed ? <Icons.ChevronDown size={14} /> : <Icons.ChevronUp size={14} />}
        </button>
      </div>
      {!collapsed && comment.replies?.map(r => (
        <Comment key={r.id} comment={r} depth={depth + 1} />
      ))}
    </div>
  );
}

// ─── Post Detail View ─────────────────────────────────────────────────────────
function PostDetail({ postId, onBack }) {
  const post = POST_MAP[postId];
  const [voted, setVoted] = useState(post?.voted || 0);
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState([]);
  const [sortComments, setSortComments] = useState('top');

  if (!post) return null;
  const author = USER_MAP[post.authorId];
  const sub = SUB_MAP[post.subId];

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `new_${Date.now()}`,
      authorId: 'me',
      text: commentText,
      upvotes: 1,
      timestamp: Date.now(),
      replies: [],
      awards: 0,
    };
    setLocalComments(prev => [newComment, ...prev]);
    setCommentText('');
  };

  const allComments = [...localComments, ...post.comments];

  return (
    <div>
      {/* Back button */}
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12, padding: '4px 0' }}>
        ← Back to {sub?.display}
      </button>

      {/* Post */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ background: 'var(--surface2)', padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
            <VoteBar upvotes={post.upvotes} voted={voted} onVote={setVoted} />
          </div>
          <div style={{ flex: 1, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: sub?.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{sub?.icon}</div>
              <span style={{ fontSize: 12, fontWeight: 700 }}>{sub?.display}</span>
              <span style={{ fontSize: 12, color: 'var(--text2)' }}>• Posted by u/{author?.name} • {fmtTime(post.timestamp)}</span>
              {post.flair && <Flair text={post.flair} color={sub?.color} />}
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.3, marginBottom: 12 }}>{post.title}</h1>
            {post.type === 'image' && (
              <div style={{ width: '100%', maxHeight: 512, background: post.imgColor, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, marginBottom: 12, padding: 40, opacity: 0.85 }}>
                {post.imgEmoji}
              </div>
            )}
            {post.body && (
              <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text)', marginBottom: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                {post.body}
              </div>
            )}
            {post.awards > 0 && <div style={{ marginBottom: 8 }}><Awards count={post.awards} /></div>}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['💬 ' + fmtNum(post.commentCount) + ' Comments','📤 Share','🔖 Save','⚑ Report'].map(a => (
                <button key={a} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', fontSize: 12, fontWeight: 700, padding: '4px 8px', borderRadius: 2 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comment box */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: 16, marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 8 }}>
          Comment as <span style={{ color: 'var(--text3)', fontWeight: 700 }}>u/{CURRENT_USER.name}</span>
        </p>
        <textarea
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="What are your thoughts?"
          style={{ width: '100%', minHeight: 100, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 4, padding: 12, fontSize: 14, color: 'var(--text)', resize: 'vertical', outline: 'none', fontFamily: 'IBM Plex Sans, sans-serif', lineHeight: 1.5 }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
          <button onClick={handleSubmitComment} disabled={!commentText.trim()}
            style={{ background: commentText.trim() ? 'var(--accent)' : 'var(--border)', color: commentText.trim() ? '#fff' : 'var(--text2)', border: 'none', borderRadius: 9999, padding: '6px 16px', fontWeight: 700, fontSize: 13, cursor: commentText.trim() ? 'pointer' : 'not-allowed' }}>
            Comment
          </button>
        </div>
      </div>

      {/* Sort bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text2)' }}>Sort by:</span>
        {['top', 'new', 'controversial'].map(s => (
          <button key={s} onClick={() => setSortComments(s)}
            style={{ background: sortComments === s ? 'var(--border)' : 'none', border: 'none', cursor: 'pointer', color: sortComments === s ? 'var(--text)' : 'var(--text2)', fontWeight: 700, fontSize: 13, padding: '4px 10px', borderRadius: 9999 }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Comments */}
      {allComments.map(c => <Comment key={c.id} comment={c} depth={0} />)}
    </div>
  );
}

// ─── Subreddit Sidebar ────────────────────────────────────────────────────────
function SubredditSidebar({ sub, joined, onJoin }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ background: sub.color, height: 64, display: 'flex', alignItems: 'flex-end', padding: '8px 12px' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: '3px solid var(--surface)', marginBottom: -20 }}>{sub.icon}</div>
      </div>
      <div style={{ padding: '28px 12px 12px' }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{sub.display}</div>
        <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12, lineHeight: 1.5 }}>{sub.description}</div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{fmtNum(sub.members)}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>Members</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#46D160' }}>● {fmtNum(Math.floor(sub.members * 0.002))}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>Online</div>
          </div>
        </div>
        <button onClick={onJoin} style={{ width: '100%', background: joined ? 'transparent' : 'var(--accent)', color: joined ? 'var(--text)' : '#fff', border: joined ? '1px solid var(--border)' : 'none', borderRadius: 9999, padding: '6px', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginBottom: 8 }}>
          {joined ? 'Joined ✓' : 'Join'}
        </button>
        <button style={{ width: '100%', background: 'none', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: 9999, padding: '6px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          Create Post
        </button>
        {sub.rules && (
          <div style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Community Rules</div>
            {sub.rules.map((r, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--text2)', padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                {i + 1}. {r}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Top Navbar ───────────────────────────────────────────────────────────────
function Navbar({ dark, setDark, searchQuery, setSearchQuery, onSearch, activeView, setActiveView }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--surface)', borderBottom: '1px solid var(--border)', height: 48, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }} onClick={() => setActiveView({ type: 'home' })}>
        <Icons.Reddit size={32} />
        <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--text)', letterSpacing: -0.5, fontFamily: 'IBM Plex Sans, sans-serif' }}>readit</span>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 690, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <Icons.Search size={16} stroke="var(--text2)" />
        </div>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          placeholder="Search Readit"
          style={{ width: '100%', background: searchFocused ? 'var(--surface)' : 'var(--surface2)', border: `1px solid ${searchFocused ? 'var(--text3)' : 'var(--border)'}`, borderRadius: 20, padding: '8px 12px 8px 36px', fontSize: 14, color: 'var(--text)', outline: 'none', transition: 'all 0.2s' }}
        />
      </div>

      {/* Nav actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto', flexShrink: 0 }}>
        <button onClick={() => setDark(d => !d)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', padding: 8, borderRadius: 4, display: 'flex' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}>
          {dark ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', padding: 8, borderRadius: 4, display: 'flex' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}>
          <Icons.Plus size={20} />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', padding: 8, borderRadius: 4, display: 'flex' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}>
          <Icons.Bell size={20} />
        </button>
        {/* User menu */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowUserMenu(m => !m)} style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text)', padding: '4px 8px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6 }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            <Avatar user={CURRENT_USER} size={24} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{CURRENT_USER.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>🏆 {fmtNum(CURRENT_USER.karma)} karma</div>
            </div>
            <Icons.ChevronDown size={14} />
          </button>
          {showUserMenu && (
            <div style={{ position: 'absolute', top: '100%', right: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, width: 200, zIndex: 200, boxShadow: 'var(--shadow)', marginTop: 4 }}
              onClick={() => setShowUserMenu(false)}>
              {[
                { icon: <Icons.User size={14} />, label: 'Profile' },
                { icon: <Icons.Trophy size={14} />, label: `${fmtNum(CURRENT_USER.karma)} karma` },
                { icon: <Icons.Bookmark size={14} />, label: 'Saved' },
                { icon: <Icons.Star size={14} />, label: 'Premium' },
                { icon: <Icons.Edit size={14} />, label: 'Settings' },
              ].map(item => (
                <button key={item.label} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', fontSize: 13, padding: '10px 12px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button style={{ background: 'var(--accent)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 14px', borderRadius: 9999 }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}>
          Post
        </button>
      </div>
    </nav>
  );
}

// ─── Left Sidebar ─────────────────────────────────────────────────────────────
function LeftSidebar({ activeView, setActiveView, joinedSubs }) {
  const navItems = [
    { icon: <Icons.Home size={18} />, label: 'Home', view: { type: 'home' } },
    { icon: <Icons.Trending size={18} />, label: 'Popular', view: { type: 'popular' } },
    { icon: <Icons.New size={18} />, label: 'All', view: { type: 'all' } },
  ];

  return (
    <aside style={{ width: 270, flexShrink: 0, paddingTop: 24, paddingRight: 24, position: 'sticky', top: 48, maxHeight: 'calc(100vh - 48px)', overflowY: 'auto' }}>
      {navItems.map(item => (
        <button key={item.label} onClick={() => setActiveView(item.view)}
          style={{ width: '100%', background: activeView.type === item.view.type ? 'var(--border)' : 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', fontSize: 14, fontWeight: 700, padding: '8px 12px', borderRadius: 4, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2, transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
          onMouseLeave={e => e.currentTarget.style.background = activeView.type === item.view.type ? 'var(--border)' : 'none'}>
          {item.icon} {item.label}
        </button>
      ))}

      <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />

      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', letterSpacing: 1, padding: '4px 12px', marginBottom: 4 }}>YOUR COMMUNITIES</div>
      {SUBREDDITS.slice(0, 12).map(sub => (
        <button key={sub.id} onClick={() => setActiveView({ type: 'sub', subId: sub.id })}
          style={{ width: '100%', background: activeView.subId === sub.id ? 'var(--border)' : 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', fontSize: 13, padding: '6px 12px', borderRadius: 4, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 1, transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
          onMouseLeave={e => e.currentTarget.style.background = activeView.subId === sub.id ? 'var(--border)' : 'none'}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: sub.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{sub.icon}</div>
          {sub.display}
        </button>
      ))}

      <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
      <div style={{ fontSize: 11, color: 'var(--text2)', padding: '0 12px', lineHeight: 1.8 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Readit Inc © 2025</div>
        Built by <strong style={{ color: 'var(--accent)' }}>Tamaghna Nag</strong><br />
        SDE3, Nordstrom
      </div>
    </aside>
  );
}

// ─── Right Sidebar ────────────────────────────────────────────────────────────
function RightSidebar({ posts, setActiveView }) {
  const topPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes).slice(0, 5);

  return (
    <aside style={{ width: 312, flexShrink: 0, paddingTop: 24, paddingLeft: 24 }}>
      {/* Premium card */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
          <Icons.Star size={28} style={{ color: '#FFD700' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Reddit Premium</div>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>The best Reddit experience</div>
          </div>
        </div>
        <button style={{ width: '100%', background: '#FFD700', border: 'none', borderRadius: 9999, padding: '6px', fontWeight: 700, fontSize: 13, cursor: 'pointer', color: '#000' }}>
          Try Now
        </button>
      </div>

      {/* Top communities */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '12px 16px', background: 'linear-gradient(to bottom, var(--accent), #ff6534)', color: '#fff', fontWeight: 700, fontSize: 14 }}>
          🏆 Top Communities
        </div>
        {SUBREDDITS.slice(0, 8).map((sub, i) => (
          <div key={sub.id} onClick={() => setActiveView({ type: 'sub', subId: sub.id })} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', width: 16 }}>#{i + 1}</span>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: sub.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{sub.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub.display}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>{fmtNum(sub.members)} members</div>
            </div>
            <button style={{ background: 'none', border: '1px solid var(--accent)', borderRadius: 9999, padding: '2px 10px', color: 'var(--accent)', fontWeight: 700, fontSize: 12, cursor: 'pointer', flexShrink: 0 }}
              onClick={e => e.stopPropagation()}>
              Join
            </button>
          </div>
        ))}
      </div>

      {/* Trending */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icons.Fire size={16} stroke="none" style={{ color: 'var(--accent)' }} /> Trending Today
        </div>
        {topPosts.map(post => {
          const sub = SUB_MAP[post.subId];
          return (
            <div key={post.id} onClick={() => setActiveView({ type: 'post', postId: post.id })} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 700, marginBottom: 2 }}>{sub?.display}</div>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginBottom: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>⬆ {fmtNum(post.upvotes)} • 💬 {fmtNum(post.commentCount)}</div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

// ─── Home Feed ────────────────────────────────────────────────────────────────
function HomeFeed({ posts, setActiveView, sort, setSort }) {
  const sorted = useMemo(() => {
    const p = [...posts];
    if (sort === 'hot') return p.sort((a, b) => (b.upvotes * 0.7 + b.commentCount * 0.3) - (a.upvotes * 0.7 + a.commentCount * 0.3));
    if (sort === 'new') return p.sort((a, b) => b.timestamp - a.timestamp);
    if (sort === 'top') return p.sort((a, b) => b.upvotes - a.upvotes);
    if (sort === 'rising') return p.sort((a, b) => b.commentCount - a.commentCount);
    return p;
  }, [posts, sort]);

  const sorts = [
    { key: 'hot', icon: <Icons.Fire size={16} stroke="none" style={{ color: 'inherit' }} />, label: 'Hot' },
    { key: 'new', icon: <Icons.New size={16} />, label: 'New' },
    { key: 'top', icon: <Icons.Top size={16} />, label: 'Top' },
    { key: 'rising', icon: <Icons.Trending size={16} />, label: 'Rising' },
  ];

  return (
    <div>
      {/* Sort bar */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px', marginBottom: 12, display: 'flex', gap: 4 }}>
        {sorts.map(s => (
          <button key={s.key} onClick={() => setSort(s.key)}
            style={{ background: sort === s.key ? 'var(--border)' : 'none', border: 'none', cursor: 'pointer', color: sort === s.key ? 'var(--accent)' : 'var(--text2)', fontWeight: 700, fontSize: 14, padding: '6px 12px', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {sorted.map(post => (
        <PostCard key={post.id} post={post} onOpen={id => setActiveView({ type: 'post', postId: id })} />
      ))}
    </div>
  );
}

// ─── Subreddit View ───────────────────────────────────────────────────────────
function SubredditView({ subId, posts, setActiveView }) {
  const sub = SUB_MAP[subId];
  const [joined, setJoined] = useState(false);
  const [sort, setSort] = useState('hot');
  const subPosts = posts.filter(p => p.subId === subId);

  if (!sub) return <div style={{ padding: 20, color: 'var(--text2)' }}>Subreddit not found</div>;

  return (
    <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Sub header */}
        <div style={{ background: sub.color, height: 80, marginBottom: 0 }} />
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '0 16px 12px', marginBottom: 16, borderRadius: '0 0 4px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: -20, marginBottom: 8 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: '4px solid var(--surface)' }}>{sub.icon}</div>
            <div style={{ paddingBottom: 4 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{sub.display}</h1>
              <div style={{ fontSize: 14, color: 'var(--text2)' }}>r/{sub.name} • {fmtNum(sub.members)} members</div>
            </div>
            <button onClick={() => setJoined(j => !j)} style={{ marginLeft: 'auto', marginBottom: 4, background: joined ? 'transparent' : 'var(--accent)', color: joined ? 'var(--text)' : '#fff', border: joined ? '1px solid var(--border)' : 'none', borderRadius: 9999, padding: '6px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              {joined ? 'Joined' : 'Join'}
            </button>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0 }}>{sub.description}</p>
        </div>

        {/* Sort + posts */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px', marginBottom: 12, display: 'flex', gap: 4 }}>
          {['hot', 'new', 'top'].map(s => (
            <button key={s} onClick={() => setSort(s)}
              style={{ background: sort === s ? 'var(--border)' : 'none', border: 'none', cursor: 'pointer', color: sort === s ? 'var(--accent)' : 'var(--text2)', fontWeight: 700, fontSize: 14, padding: '6px 12px', borderRadius: 2 }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {subPosts.length === 0 ? (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: 40, textAlign: 'center', color: 'var(--text2)' }}>
            No posts in this subreddit yet. Be the first to post!
          </div>
        ) : (
          subPosts.map(post => (
            <PostCard key={post.id} post={post} onOpen={id => setActiveView({ type: 'post', postId: id })} />
          ))
        )}
      </div>
      {/* Sidebar */}
      <div style={{ width: 312, flexShrink: 0, paddingLeft: 24 }}>
        <SubredditSidebar sub={sub} joined={joined} onJoin={() => setJoined(j => !j)} />
      </div>
    </div>
  );
}

// ─── Search Results ───────────────────────────────────────────────────────────
function SearchResults({ query, posts, setActiveView }) {
  const results = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.body?.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'var(--text2)' }}>
        Search results for "<span style={{ color: 'var(--text)' }}>{query}</span>" — {results.length} posts
      </h2>
      {results.length === 0 ? (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: 40, textAlign: 'center', color: 'var(--text2)' }}>
          No posts found for "{query}". Try different keywords.
        </div>
      ) : (
        results.map(post => (
          <PostCard key={post.id} post={post} onOpen={id => setActiveView({ type: 'post', postId: id })} />
        ))
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const [activeView, setActiveView] = useState({ type: 'home' });
  const [sort, setSort] = useState('hot');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState('');
  const [posts] = useState(ALL_POSTS);
  const [joinedSubs, setJoinedSubs] = useState(new Set(['r_askreddit', 'r_todayilearned', 'r_worldnews', 'r_technology', 'r_science']));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchSubmitted(searchQuery.trim());
      setActiveView({ type: 'search', query: searchQuery.trim() });
    }
  };

  const renderCenter = () => {
    if (activeView.type === 'post') {
      return <PostDetail postId={activeView.postId} onBack={() => setActiveView({ type: activeView.subId ? 'sub' : 'home', subId: activeView.subId })} />;
    }
    if (activeView.type === 'sub') {
      return <SubredditView subId={activeView.subId} posts={posts} setActiveView={v => setActiveView({ ...v, subId: activeView.subId })} />;
    }
    if (activeView.type === 'search') {
      return <SearchResults query={activeView.query} posts={posts} setActiveView={setActiveView} />;
    }
    // Home, popular, all
    return <HomeFeed posts={posts} setActiveView={setActiveView} sort={sort} setSort={setSort} />;
  };

  const showRightSidebar = activeView.type !== 'sub' && activeView.type !== 'post';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar dark={dark} setDark={setDark} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} activeView={activeView} setActiveView={setActiveView} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'flex-start' }}>
        <LeftSidebar activeView={activeView} setActiveView={setActiveView} joinedSubs={joinedSubs} />
        <main style={{ flex: 1, minWidth: 0, padding: '24px 0', maxWidth: showRightSidebar ? 'calc(100% - 270px - 312px - 48px)' : 'calc(100% - 270px - 24px)' }}>
          {renderCenter()}
        </main>
        {showRightSidebar && <RightSidebar posts={posts} setActiveView={setActiveView} />}
      </div>
    </div>
  );
}
