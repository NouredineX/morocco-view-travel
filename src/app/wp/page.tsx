'use client';

import React, { useState, useEffect } from 'react';
import { tours as initialTours } from '@/data/tours';
import { blogPosts as initialBlogPosts } from '@/data/blogPosts';
import type { Tour, BlogPost } from '@/types';
import enLocale from '@/locales/en.json';
import esLocale from '@/locales/es.json';
import frLocale from '@/locales/fr.json';
import itLocale from '@/locales/it.json';
import jaLocale from '@/locales/ja.json';
import zhLocale from '@/locales/zh.json';

// Password protection credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'morocco2026!';

export default function WpDashboard() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  // Load light mode setting from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('wp_dashboard_theme');
    if (savedTheme === 'dark') {
      setIsLightMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    localStorage.setItem('wp_dashboard_theme', newTheme ? 'light' : 'dark');
  };

  const colors = {
    bgApp: isLightMode ? '#F0F2F5' : '#080C14',
    bgSidebar: isLightMode ? '#1D2327' : '#0D121F',
    textSidebar: isLightMode ? '#F0F0F1' : '#C0B7A3',
    textSidebarActive: isLightMode ? '#72aee6' : '#C5A86E',
    bgSidebarActive: isLightMode ? '#101517' : 'rgba(197, 168, 110, 0.15)',
    bgCard: isLightMode ? '#FFFFFF' : '#0D121F',
    border: isLightMode ? '1px solid #DCDCDE' : '1px solid rgba(255, 255, 255, 0.08)',
    textPrimary: isLightMode ? '#1D2327' : '#F5F0EB',
    textSecondary: isLightMode ? '#50575E' : '#C0B7A3',
    textMuted: isLightMode ? '#787c82' : '#7E7869',
    inputBg: isLightMode ? '#FFFFFF' : 'rgba(0, 0, 0, 0.2)',
    inputBorder: isLightMode ? '1px solid #8c8f94' : '1px solid rgba(255, 255, 255, 0.1)',
    inputText: isLightMode ? '#2c3338' : '#F5F0EB',
    tableHeaderBg: isLightMode ? '#F6F7F7' : 'rgba(255, 255, 255, 0.02)',
    tableHeaderBorder: isLightMode ? '1px solid #DCDCDE' : '1px solid rgba(255, 255, 255, 0.08)',
    tableRowBorder: isLightMode ? '1px solid #F0F0F1' : '1px solid rgba(255, 255, 255, 0.04)',
    accent: '#C5A86E',
    accentDark: '#A38346',
    btnPrimaryBg: isLightMode ? '#2271B1' : '#C5A86E',
    btnPrimaryText: isLightMode ? '#FFFFFF' : '#080C14',
    btnSecondaryBg: isLightMode ? '#F6F7F7' : 'rgba(255, 255, 255, 0.05)',
    btnSecondaryText: isLightMode ? '#2271B1' : '#C0B7A3',
    btnSecondaryBorder: isLightMode ? '1px solid #2271B1' : 'none'
  };
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'dashboard' | 'posts' | 'tours' | 'git-push'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'tours' | 'languages' | 'git-push'>('dashboard');

  // Database States (loaded from localStorage or defaults)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  
  // Locales States
  const [localesData, setLocalesData] = useState<Record<string, any>>({
    en: {}, es: {}, fr: {}, it: {}, ja: {}, zh: {}
  });
  const [activeLang, setActiveLang] = useState<string>('en');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLocaleGroup, setActiveLocaleGroup] = useState<string>('all');

  // GitHub Integration Settings
  const [githubToken, setGithubToken] = useState('');
  const [githubRepo, setGithubRepo] = useState('NouredineX/morocco-view-travel');
  const [gitStatus, setGitStatus] = useState('');

  // Editor States
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isCreatingNewPost, setIsCreatingNewPost] = useState(false);

  // Initialize data on component mount
  useEffect(() => {
    // Check authentication
    const loggedIn = sessionStorage.getItem('wp_admin_logged_in');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }

    // Load posts
    const localPosts = localStorage.getItem('wp_blog_posts');
    if (localPosts) {
      setBlogPosts(JSON.parse(localPosts));
    } else {
      setBlogPosts(initialBlogPosts);
    }

    // Load tours
    const localTours = localStorage.getItem('wp_tours');
    if (localTours) {
      setTours(JSON.parse(localTours));
    } else {
      setTours(initialTours);
    }

    // Load locales from localStorage or defaults
    const loadedLocales: Record<string, any> = {};
    ['en', 'es', 'fr', 'it', 'ja', 'zh'].forEach(lang => {
      const saved = localStorage.getItem(`wp_locale_${lang}`);
      if (saved) {
        loadedLocales[lang] = JSON.parse(saved);
      } else {
        const defaultLocales: Record<string, any> = {
          en: enLocale,
          es: esLocale,
          fr: frLocale,
          it: itLocale,
          ja: jaLocale,
          zh: zhLocale
        };
        loadedLocales[lang] = defaultLocales[lang];
      }
    });
    setLocalesData(loadedLocales);

    // Load GitHub settings
    const savedToken = localStorage.getItem('wp_github_token') || '';
    const savedRepo = localStorage.getItem('wp_github_repo') || 'NouredineX/morocco-view-travel';
    setGithubToken(savedToken);
    setGithubRepo(savedRepo);
  }, []);

  // Save changes to local storage
  const saveToLocal = (updatedPosts: BlogPost[], updatedTours: Tour[]) => {
    localStorage.setItem('wp_blog_posts', JSON.stringify(updatedPosts));
    localStorage.setItem('wp_tours', JSON.stringify(updatedTours));
    setBlogPosts(updatedPosts);
    setTours(updatedTours);
  };

  // Save locale data changes
  const saveLocaleToLocal = (lang: string, updatedData: any) => {
    const newLocalesData = { ...localesData, [lang]: updatedData };
    setLocalesData(newLocalesData);
    localStorage.setItem(`wp_locale_${lang}`, JSON.stringify(updatedData));
  };

  // Flatten and Unflatten Helpers for JSON editing
  const flattenObject = (ob: any): Record<string, string> => {
    const toReturn: Record<string, string> = {};
    for (const i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      if ((typeof ob[i]) === 'object' && ob[i] !== null) {
        const flatObject = flattenObject(ob[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = String(ob[i]);
      }
    }
    return toReturn;
  };

  const unflattenObject = (table: Record<string, string>): any => {
    const result: any = {};
    for (const path in table) {
      const keys = path.split('.');
      let current = result;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (i === keys.length - 1) {
          current[key] = table[path];
        } else {
          current[key] = current[key] || {};
          current = current[key];
        }
      }
    }
    return result;
  };

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === ADMIN_USER && passwordInput === ADMIN_PASS) {
      sessionStorage.setItem('wp_admin_logged_in', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password!');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('wp_admin_logged_in');
    setIsAuthenticated(false);
  };

  // Save Github credentials
  const saveGitSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('wp_github_token', githubToken);
    localStorage.setItem('wp_github_repo', githubRepo);
    alert('GitHub Settings Saved Locally!');
  };

  // Generate File Downloads (Blob)
  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/typescript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBlogPostsCode = () => {
    return `import type { BlogPost } from '../types';\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};\n`;
  };

  const getToursCode = () => {
    return `import type { Tour } from '../types';\n\nexport const tours: Tour[] = ${JSON.stringify(tours, null, 2)};\n`;
  };

  // Push Changes directly to GitHub using Repo API
  const pushToGitHub = async (filePath: string, fileContent: string) => {
    if (!githubToken) {
      alert('Please enter a GitHub Personal Access Token first!');
      return;
    }
    setGitStatus(`Fetching current file sha for ${filePath}...`);
    try {
      const getUrl = `https://api.github.com/repos/${githubRepo}/contents/${filePath}`;
      const getRes = await fetch(getUrl, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      let sha = '';
      if (getRes.status === 200) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }

      setGitStatus(`Committing updated ${filePath} to GitHub...`);
      const putRes = await fetch(getUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `Update ${filePath} via CMS Dashboard`,
          content: btoa(unescape(encodeURIComponent(fileContent))),
          sha: sha || undefined
        })
      });

      if (putRes.status === 200 || putRes.status === 201) {
        setGitStatus(`Successfully updated ${filePath} on GitHub! Build is triggering on VPS.`);
        alert(`Successfully deployed ${filePath} to GitHub!`);
      } else {
        const err = await putRes.json();
        setGitStatus(`GitHub Error: ${err.message}`);
      }
    } catch (e: any) {
      setGitStatus(`API Error: ${e.message}`);
    }
  };

  // Post Actions
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    let updatedPosts;
    if (isCreatingNewPost) {
      updatedPosts = [editingPost, ...blogPosts];
    } else {
      updatedPosts = blogPosts.map(p => p.id === editingPost.id ? editingPost : p);
    }

    saveToLocal(updatedPosts, tours);
    setEditingPost(null);
    setIsCreatingNewPost(false);
    alert('Post saved to local draft!');
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updated = blogPosts.filter(p => p.id !== id);
      saveToLocal(updated, tours);
    }
  };

  const startCreateNewPost = () => {
    const newId = `blog-${Date.now()}`;
    const newPost: BlogPost = {
      id: newId,
      slug: 'new-article-slug',
      title: 'New Article English Title',
      titleFr: '',
      titleEs: '',
      titleIt: '',
      titleJa: '',
      titleZh: '',
      excerpt: 'English excerpt summary here...',
      excerptFr: '',
      excerptEs: '',
      excerptIt: '',
      excerptJa: '',
      excerptZh: '',
      content: '<p>English body content here...</p>',
      contentFr: '',
      contentEs: '',
      contentIt: '',
      contentJa: '',
      contentZh: '',
      image: 'logo.webp',
      date: new Date().toISOString().split('T')[0],
      author: 'Admin',
      category: 'Tours',
      readTime: 5,
      focusKeyword: 'Morocco desert tour'
    };
    setEditingPost(newPost);
    setIsCreatingNewPost(true);
  };

  // Tour Actions
  const handleSaveTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTour) return;

    const updatedTours = tours.map(t => t.id === editingTour.id ? editingTour : t);
    saveToLocal(blogPosts, updatedTours);
    setEditingTour(null);
    alert('Tour saved to local draft!');
  };

  // If not logged in, show login screen
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.bgApp,
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          background: colors.bgCard,
          border: colors.border,
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          color: colors.textPrimary,
          textAlign: 'center'
        }}>
          {/* WordPress Logo SVG */}
          <svg style={{ width: '80px', height: '80px', fill: '#C5A86E', margin: '0 auto 24px' }} viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm.116 17.653c-1.393.078-2.903-.186-2.903-.186l2.129-6.177-1.385.048c-.689.022-.977-.665-.333-1.043l3.056-1.794L11 6.5s.443-.166.886-.166c1.164 0 2.217 1.054 2.217 2.052 0 .942-.831 2.216-1.524 3.298l-.443.72 2.196 6.249zm-1.897-.338L6.877 9.873c-.632.023-.92-.663-.277-1.042L9.656 7.037 8.358 3.5c1.472.079 3.018-.184 3.018-.184L9.04 9.943l1.18-.042c.687-.024.975.666.331 1.045l-3.058 1.794L9.1 19c-.443.167-.887.167-.887.167s.111.026.006 1.148z"/>
          </svg>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#F5F0EB' }}>Admin Portal</h2>
          <p style={{ color: colors.textSecondary, fontSize: '14px', marginBottom: '24px' }}>Log in with your Travelling Through Morocco credentials.</p>
          
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, textTransform: 'uppercase', marginBottom: '6px' }}>Username</label>
              <input 
                type="text" 
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: colors.textPrimary,
                  outline: 'none'
                }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, textTransform: 'uppercase', marginBottom: '6px' }}>Password</label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: colors.textPrimary,
                  outline: 'none'
                }} 
              />
            </div>

            {loginError && (
              <p style={{ color: '#E8734A', fontSize: '13px', margin: '4px 0 0' }}>{loginError}</p>
            )}
            
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '8px',
                background: colors.btnPrimaryBg,
                color: colors.btnPrimaryText,
                fontWeight: 'bold',
                marginTop: '10px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If logged in, show Main CMS Dashboard
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: colors.bgApp,
      color: colors.textPrimary,
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Sidebar Navigation */}
      <aside style={{
        width: '240px',
        borderRight: colors.border,
        background: colors.bgSidebar,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px' }}>
          <svg style={{ width: '32px', height: '32px', fill: '#C5A86E' }} viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm.116 17.653c-1.393.078-2.903-.186-2.903-.186l2.129-6.177-1.385.048c-.689.022-.977-.665-.333-1.043l3.056-1.794L11 6.5s.443-.166.886-.166c1.164 0 2.217 1.054 2.217 2.052 0 .942-.831 2.216-1.524 3.298l-.443.72 2.196 6.249zm-1.897-.338L6.877 9.873c-.632.023-.92-.663-.277-1.042L9.656 7.037 8.358 3.5c1.472.079 3.018-.184 3.018-.184L9.04 9.943l1.18-.042c.687-.024.975.666.331 1.045l-3.058 1.794L9.1 19c-.443.167-.887.167-.887.167s.111.026.006 1.148z"/>
          </svg>
          <span style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.5px' }}>Wp-Morocco</span>
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            background: isLightMode ? '#32373c' : 'rgba(255,255,255,0.05)',
            color: '#F0F0F1',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%'
          }}
        >
          {isLightMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
          <button 
            onClick={() => { setActiveTab('dashboard'); setEditingPost(null); setEditingTour(null); }}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              textAlign: 'left',
              background: activeTab === 'dashboard' ? colors.bgSidebarActive : 'transparent',
              color: activeTab === 'dashboard' ? colors.textSidebarActive : colors.textSidebar,
              fontWeight: activeTab === 'dashboard' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => { setActiveTab('posts'); setEditingPost(null); setEditingTour(null); }}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              textAlign: 'left',
              background: activeTab === 'posts' ? colors.bgSidebarActive : 'transparent',
              color: activeTab === 'posts' ? colors.textSidebarActive : colors.textSidebar,
              fontWeight: activeTab === 'posts' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            Blog Posts ({blogPosts.length})
          </button>
          <button 
            onClick={() => { setActiveTab('tours'); setEditingPost(null); setEditingTour(null); }}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              textAlign: 'left',
              background: activeTab === 'tours' ? colors.bgSidebarActive : 'transparent',
              color: activeTab === 'tours' ? colors.textSidebarActive : colors.textSidebar,
              fontWeight: activeTab === 'tours' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            Tours ({tours.length})
          </button>
          <button 
            onClick={() => { setActiveTab('languages'); setEditingPost(null); setEditingTour(null); }}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              textAlign: 'left',
              background: activeTab === 'languages' ? colors.bgSidebarActive : 'transparent',
              color: activeTab === 'languages' ? colors.textSidebarActive : colors.textSidebar,
              fontWeight: activeTab === 'languages' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            🌐 Pages & Languages
          </button>
          <button 
            onClick={() => { setActiveTab('git-push'); setEditingPost(null); setEditingTour(null); }}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              textAlign: 'left',
              background: activeTab === 'git-push' ? colors.bgSidebarActive : 'transparent',
              color: activeTab === 'git-push' ? colors.textSidebarActive : colors.textSidebar,
              fontWeight: activeTab === 'git-push' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            Save & Publish
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            textAlign: 'left',
            color: '#E8734A',
            cursor: 'pointer',
            border: '1px dashed rgba(232, 115, 74, 0.3)'
          }}
        >
          Sign Out
        </button>
      </aside>

      {/* Main Workspace Area */}
      <main style={{ flexGrow: 1, padding: '40px', overflowY: 'auto', maxHeight: '100vh' }}>
        
        {/* Tab 1: Dashboard Home */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: isLightMode ? '#2271B1' : '#C5A86E' }}>WP Admin Panel</h1>
            <p style={{ color: colors.textSecondary, fontSize: '16px', marginBottom: '32px' }}>
              Welcome back to your Travelling Through Morocco content management panel. From here you can add or edit blog articles and details, configure translations, and publish updates live.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
              <div style={{ background: colors.bgCard, border: colors.border, padding: '24px', borderRadius: '12px' }}>
                <span style={{ fontSize: '14px', color: colors.textMuted, textTransform: 'uppercase' }}>Active Blog Posts</span>
                <h3 style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px 0', color: isLightMode ? '#2271B1' : '#C5A86E' }}>{blogPosts.length}</h3>
                <button onClick={() => setActiveTab('posts')} style={{ color: colors.textSecondary, fontSize: '14px', textDecoration: 'underline' }}>Manage Posts &rarr;</button>
              </div>

              <div style={{ background: colors.bgCard, border: colors.border, padding: '24px', borderRadius: '12px' }}>
                <span style={{ fontSize: '14px', color: colors.textMuted, textTransform: 'uppercase' }}>Active Tours</span>
                <h3 style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px 0', color: isLightMode ? '#2271B1' : '#C5A86E' }}>{tours.length}</h3>
                <button onClick={() => setActiveTab('tours')} style={{ color: colors.textSecondary, fontSize: '14px', textDecoration: 'underline' }}>Manage Tours &rarr;</button>
              </div>

              <div style={{ background: colors.bgCard, border: colors.border, padding: '24px', borderRadius: '12px' }}>
                <span style={{ fontSize: '14px', color: colors.textMuted, textTransform: 'uppercase' }}>Support Languages</span>
                <h3 style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px 0', color: isLightMode ? '#2271B1' : '#C5A86E' }}>6</h3>
                <span style={{ color: colors.textMuted, fontSize: '14px' }}>EN, FR, ES, IT, JA, ZH</span>
              </div>
            </div>

            {/* Quick Draft info */}
            <div style={{ background: colors.bgCard, border: colors.border, padding: '24px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Quick Instructions</h3>
              <ul style={{ color: colors.textSecondary, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', listStyleType: 'decimal' }}>
                <li>Select **Blog Posts** or **Tours** from the left sidebar to add new or edit existing items.</li>
                <li>Write content in all required languages (English is mandatory; translations are recommended).</li>
                <li>Go to **Save & Publish** to download updated code files or connect with GitHub for automatic real-time deployment!</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Blog Posts Manager */}
        {activeTab === 'posts' && !editingPost && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: isLightMode ? '#2271B1' : '#C5A86E' }}>Manage Blog Posts</h1>
              <button 
                onClick={startCreateNewPost}
                style={{
                  padding: '10px 18px',
                  background: colors.btnPrimaryBg,
                  color: colors.btnPrimaryText,
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                + Add New Post
              </button>
            </div>

            <div style={{ background: colors.bgCard, border: colors.border, borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: colors.tableHeaderBg, borderBottom: colors.tableHeaderBorder }}>
                    <th style={{ padding: '16px' }}>Title</th>
                    <th style={{ padding: '16px' }}>Slug</th>
                    <th style={{ padding: '16px' }}>Category</th>
                    <th style={{ padding: '16px' }}>Date</th>
                    <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map(post => (
                    <tr key={post.id} style={{ borderBottom: colors.tableRowBorder }}>
                      <td style={{ padding: '16px', fontWeight: 'bold' }}>{post.title}</td>
                      <td style={{ padding: '16px', color: colors.textMuted }}>/{post.slug}</td>
                      <td style={{ padding: '16px' }}>{post.category}</td>
                      <td style={{ padding: '16px' }}>{post.date}</td>
                      <td style={{ padding: '16px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => { setEditingPost(post); setIsCreatingNewPost(false); }}
                          style={{ padding: '6px 12px', background: 'rgba(197, 168, 110, 0.15)', color: isLightMode ? '#2271B1' : '#C5A86E', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          style={{ padding: '6px 12px', background: 'rgba(232, 115, 74, 0.15)', color: '#E8734A', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Blog Post Editor Sub-view */}
        {activeTab === 'posts' && editingPost && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: isLightMode ? '#2271B1' : '#C5A86E' }}>
                {isCreatingNewPost ? 'Create New Post' : `Edit Post: ${editingPost.title}`}
              </h1>
              <button 
                onClick={() => { setEditingPost(null); setIsCreatingNewPost(false); }}
                style={{ padding: '8px 16px', background: 'rgba(255, 255, 255, 0.05)', color: colors.textSecondary, borderRadius: '6px', border: 'none', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: colors.bgCard, border: colors.border, padding: '32px', borderRadius: '12px' }}>
              {/* Meta information row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Post ID</label>
                  <input type="text" value={editingPost.id} disabled style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', color: colors.textMuted }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>URL Slug</label>
                  <input type="text" value={editingPost.slug} onChange={e => setEditingPost({ ...editingPost, slug: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Publish Date</label>
                  <input type="date" value={editingPost.date} onChange={e => setEditingPost({ ...editingPost, date: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Focus Keyword</label>
                  <input type="text" value={editingPost.focusKeyword} onChange={e => setEditingPost({ ...editingPost, focusKeyword: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                </div>
              </div>

              {/* Title & Excerpt Translators */}
              <div style={{ borderTop: colors.border, paddingTop: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: isLightMode ? '#2271B1' : '#C5A86E', marginBottom: '16px' }}>Titles & Excerpts (Translations)</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* English */}
                  <div style={{ background: colors.bgApp, padding: '16px', borderRadius: '8px', border: colors.border }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: isLightMode ? '#2271B1' : '#C5A86E', marginBottom: '10px' }}>English (Default)</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input type="text" placeholder="English Title" value={editingPost.title} onChange={e => setEditingPost({ ...editingPost, title: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                      <textarea placeholder="English Excerpt" value={editingPost.excerpt} onChange={e => setEditingPost({ ...editingPost, excerpt: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: colors.textPrimary, height: '60px' }} />
                    </div>
                  </div>

                  {/* French */}
                  <div style={{ background: colors.bgApp, padding: '16px', borderRadius: '8px', border: colors.border }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: colors.textSecondary, marginBottom: '10px' }}>French (fr)</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input type="text" placeholder="French Title" value={editingPost.titleFr} onChange={e => setEditingPost({ ...editingPost, titleFr: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                      <textarea placeholder="French Excerpt" value={editingPost.excerptFr || ''} onChange={e => setEditingPost({ ...editingPost, excerptFr: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: colors.textPrimary, height: '60px' }} />
                    </div>
                  </div>

                  {/* Spanish */}
                  <div style={{ background: colors.bgApp, padding: '16px', borderRadius: '8px', border: colors.border }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: colors.textSecondary, marginBottom: '10px' }}>Spanish (es)</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input type="text" placeholder="Spanish Title" value={editingPost.titleEs} onChange={e => setEditingPost({ ...editingPost, titleEs: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                      <textarea placeholder="Spanish Excerpt" value={editingPost.excerptEs || ''} onChange={e => setEditingPost({ ...editingPost, excerptEs: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: colors.textPrimary, height: '60px' }} />
                    </div>
                  </div>

                  {/* Italian, Japanese, Chinese */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Italian Title (it)</label>
                      <input type="text" value={editingPost.titleIt || ''} onChange={e => setEditingPost({ ...editingPost, titleIt: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Japanese Title (ja)</label>
                      <input type="text" value={editingPost.titleJa || ''} onChange={e => setEditingPost({ ...editingPost, titleJa: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Chinese Title (zh)</label>
                      <input type="text" value={editingPost.titleZh || ''} onChange={e => setEditingPost({ ...editingPost, titleZh: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Areas */}
              <div style={{ borderTop: colors.border, paddingTop: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: isLightMode ? '#2271B1' : '#C5A86E', marginBottom: '16px' }}>Body Contents (HTML Supported)</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: isLightMode ? '#2271B1' : '#C5A86E', marginBottom: '6px', fontWeight: 'bold' }}>English Content</label>
                    <textarea value={editingPost.content} onChange={e => setEditingPost({ ...editingPost, content: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: colors.textPrimary, height: '200px', fontFamily: 'monospace', fontSize: '13px' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: colors.textSecondary, marginBottom: '6px' }}>French Content (Optional)</label>
                    <textarea value={editingPost.contentFr || ''} onChange={e => setEditingPost({ ...editingPost, contentFr: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: colors.textPrimary, height: '120px', fontFamily: 'monospace', fontSize: '13px' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: colors.textSecondary, marginBottom: '6px' }}>Spanish Content (Optional)</label>
                    <textarea value={editingPost.contentEs || ''} onChange={e => setEditingPost({ ...editingPost, contentEs: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: colors.textPrimary, height: '120px', fontFamily: 'monospace', fontSize: '13px' }} />
                  </div>
                </div>
              </div>

              {/* Editor Details Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', borderTop: colors.border, paddingTop: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Image file</label>
                  <input type="text" value={editingPost.image} onChange={e => setEditingPost({ ...editingPost, image: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Author</label>
                  <input type="text" value={editingPost.author} onChange={e => setEditingPost({ ...editingPost, author: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Category</label>
                  <input type="text" value={editingPost.category} onChange={e => setEditingPost({ ...editingPost, category: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Read Time (min)</label>
                  <input type="number" value={editingPost.readTime} onChange={e => setEditingPost({ ...editingPost, readTime: parseInt(e.target.value) || 5 })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <button type="submit" style={{ padding: '12px 24px', background: colors.btnPrimaryBg, color: colors.btnPrimaryText, fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                  Save to Drafts
                </button>
                <button type="button" onClick={() => { setEditingPost(null); setIsCreatingNewPost(false); }} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.05)', color: colors.textSecondary, borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                  Discard
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Tours Manager */}
        {activeTab === 'tours' && !editingTour && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: isLightMode ? '#2271B1' : '#C5A86E' }}>Manage Tour Packages</h1>
            
            <div style={{ background: colors.bgCard, border: colors.border, borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: colors.tableHeaderBg, borderBottom: colors.tableHeaderBorder }}>
                    <th style={{ padding: '16px' }}>Tour Name</th>
                    <th style={{ padding: '16px' }}>Departure</th>
                    <th style={{ padding: '16px' }}>Duration</th>
                    <th style={{ padding: '16px' }}>Price</th>
                    <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map(tour => (
                    <tr key={tour.id} style={{ borderBottom: colors.tableRowBorder }}>
                      <td style={{ padding: '16px', fontWeight: 'bold' }}>{tour.title}</td>
                      <td style={{ padding: '16px' }}>{tour.departure}</td>
                      <td style={{ padding: '16px' }}>{tour.duration} {tour.durationUnit}</td>
                      <td style={{ padding: '16px', color: isLightMode ? '#2271B1' : '#C5A86E', fontWeight: 'bold' }}>{tour.pricePerPerson} {tour.currency}</td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <button 
                          onClick={() => setEditingTour(tour)}
                          style={{ padding: '6px 12px', background: 'rgba(197, 168, 110, 0.15)', color: isLightMode ? '#2271B1' : '#C5A86E', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tour Editor Sub-view */}
        {activeTab === 'tours' && editingTour && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: isLightMode ? '#2271B1' : '#C5A86E' }}>Edit Tour: {editingTour.title}</h1>
              <button onClick={() => setEditingTour(null)} style={{ padding: '8px 16px', background: 'rgba(255, 255, 255, 0.05)', color: colors.textSecondary, borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </div>

            <form onSubmit={handleSaveTour} style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: colors.bgCard, border: colors.border, padding: '32px', borderRadius: '12px' }}>
              
              {/* Core Tour Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Tour ID</label>
                  <input type="text" value={editingTour.id} disabled style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', color: colors.textMuted }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Price (€)</label>
                  <input type="number" value={editingTour.pricePerPerson} onChange={e => setEditingTour({ ...editingTour, pricePerPerson: parseInt(e.target.value) || 0 })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Duration</label>
                  <input type="number" value={editingTour.duration} onChange={e => setEditingTour({ ...editingTour, duration: parseInt(e.target.value) || 0 })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Departure City</label>
                  <input type="text" value={editingTour.departure} onChange={e => setEditingTour({ ...editingTour, departure: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                </div>
              </div>

              {/* Title Translations */}
              <div style={{ borderTop: colors.border, paddingTop: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: isLightMode ? '#2271B1' : '#C5A86E', marginBottom: '12px' }}>Tour Titles (Translations)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>English</label>
                    <input type="text" value={editingTour.title} onChange={e => setEditingTour({ ...editingTour, title: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>French (fr)</label>
                    <input type="text" value={editingTour.titleFr} onChange={e => setEditingTour({ ...editingTour, titleFr: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Spanish (es)</label>
                    <input type="text" value={editingTour.titleEs} onChange={e => setEditingTour({ ...editingTour, titleEs: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', background: colors.inputBg, border: colors.inputBorder, color: colors.inputText }} />
                  </div>
                </div>
              </div>

              {/* Exclusions & Highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: colors.border, paddingTop: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Highlights (Comma separated)</label>
                  <textarea 
                    value={editingTour.highlights.join(', ')} 
                    onChange={e => setEditingTour({ ...editingTour, highlights: e.target.value.split(',').map(s => s.trim()) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: colors.textPrimary, height: '80px' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px' }}>Cities Visited (Comma separated)</label>
                  <textarea 
                    value={editingTour.cities.join(', ')} 
                    onChange={e => setEditingTour({ ...editingTour, cities: e.target.value.split(',').map(s => s.trim()) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: colors.textPrimary, height: '80px' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button type="submit" style={{ padding: '12px 24px', background: colors.btnPrimaryBg, color: colors.btnPrimaryText, fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                  Save Tour Changes
                </button>
                <button type="button" onClick={() => setEditingTour(null)} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.05)', color: colors.textSecondary, borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                  Discard
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 5: Site Pages & Languages Translation Editor */}
        {activeTab === 'languages' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: isLightMode ? '#2271B1' : '#C5A86E' }}>🌐 Site Pages & Languages</h1>
            <p style={{ color: colors.textSecondary, fontSize: '15px', marginBottom: '24px' }}>
              Control all static texts, navigation links, titles, subtitles, and paragraphs across all pages (Home, About, Destinations, Our Fleet, Contact, Privacy Policy) for all active languages.
            </p>

            {/* Language Selection Bar */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {[
                { code: 'en', label: 'English (Default)' },
                { code: 'fr', label: 'French (fr)' },
                { code: 'es', label: 'Spanish (es)' },
                { code: 'it', label: 'Italian (it)' },
                { code: 'ja', label: 'Japanese (ja)' },
                { code: 'zh', label: 'Chinese (zh)' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { setActiveLang(lang.code); }}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: activeLang === lang.code ? (isLightMode ? '#2271B1' : '#C5A86E') : colors.bgCard,
                    color: activeLang === lang.code ? (isLightMode ? '#FFFFFF' : '#080C14') : colors.textPrimary,
                    border: activeLang === lang.code ? 'none' : colors.border,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'start' }}>
              {/* Group selection sidebar */}
              <div style={{ background: colors.bgCard, border: colors.border, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: colors.textMuted, textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>Page/Section</label>
                {[
                  { id: 'all', label: 'All Texts' },
                  { id: 'nav', label: 'Navigation Menu' },
                  { id: 'hero', label: 'Hero Slider / Banner' },
                  { id: 'sections', label: 'Homepage Sections' },
                  { id: 'about', label: 'About Us Page' },
                  { id: 'destinations', label: 'Destinations Page' },
                  { id: 'fleet', label: 'Our Fleet Page' },
                  { id: 'contact', label: 'Contact Page' },
                  { id: 'footer', label: 'Footer info' },
                  { id: 'privacy', label: 'Privacy Policy' }
                ].map(group => (
                  <button
                    key={group.id}
                    onClick={() => setActiveLocaleGroup(group.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      textAlign: 'left',
                      background: activeLocaleGroup === group.id ? (isLightMode ? 'rgba(34, 113, 177, 0.1)' : 'rgba(197, 168, 110, 0.15)') : 'transparent',
                      color: activeLocaleGroup === group.id ? (isLightMode ? '#2271B1' : '#C5A86E') : colors.textSecondary,
                      border: 'none',
                      fontWeight: activeLocaleGroup === group.id ? 'bold' : 'normal',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    {group.label}
                  </button>
                ))}
              </div>

              {/* Translation Inputs List */}
              <div style={{ background: colors.bgCard, border: colors.border, borderRadius: '12px', padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Editing Translation Dictionary: {activeLang.toUpperCase()}</h3>
                  
                  {/* Search box */}
                  <input
                    type="text"
                    placeholder="Search keys or values..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: colors.inputBg,
                      border: colors.inputBorder,
                      color: colors.inputText,
                      fontSize: '13px',
                      width: '240px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '12px', marginBottom: '24px' }}>
                  {(() => {
                    const flatData = flattenObject(localesData[activeLang] || {});
                    const filteredKeys = Object.keys(flatData).filter(key => {
                      // Filter by group
                      if (activeLocaleGroup !== 'all') {
                        if (!key.startsWith(activeLocaleGroup)) return false;
                      }
                      // Filter by search query
                      if (searchQuery) {
                        const val = String(flatData[key]).toLowerCase();
                        const q = searchQuery.toLowerCase();
                        return key.toLowerCase().includes(q) || val.includes(q);
                      }
                      return true;
                    });

                    if (filteredKeys.length === 0) {
                      return <p style={{ color: colors.textMuted, fontSize: '14px', textAlign: 'center', padding: '40px' }}>No translation keys found matching filters.</p>;
                    }

                    return filteredKeys.map(key => {
                      const value = flatData[key];
                      const isLongText = value.length > 60 || key.includes('story') || key.includes('desc') || key.includes('privacy') || key.includes('bio');
                      
                      return (
                        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: `1px solid ${isLightMode ? '#F0F0F1' : 'rgba(255,255,255,0.03)'}`, paddingBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: colors.accent, fontWeight: 'bold' }}>{key}</span>
                            <span style={{ fontSize: '10px', color: colors.textMuted, textTransform: 'uppercase' }}>{key.split('.')[0]}</span>
                          </div>
                          {isLongText ? (
                            <textarea
                              value={value}
                              onChange={e => {
                                const newFlat = { ...flatData, [key]: e.target.value };
                                saveLocaleToLocal(activeLang, unflattenObject(newFlat));
                              }}
                              style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '6px',
                                background: colors.inputBg,
                                border: colors.inputBorder,
                                color: colors.inputText,
                                fontSize: '13px',
                                height: '80px',
                                resize: 'vertical',
                                lineHeight: '1.5'
                              }}
                            />
                          ) : (
                            <input
                              type="text"
                              value={value}
                              onChange={e => {
                                const newFlat = { ...flatData, [key]: e.target.value };
                                saveLocaleToLocal(activeLang, unflattenObject(newFlat));
                              }}
                              style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '6px',
                                background: colors.inputBg,
                                border: colors.inputBorder,
                                color: colors.inputText,
                                fontSize: '13px'
                              }}
                            />
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: colors.border, paddingTop: '20px' }}>
                  <span style={{ fontSize: '12px', color: colors.textMuted }}>⚠️ Changes are saved in your local browser drafts. Remember to deploy them live f the "Save & Publish" tab.</span>
                  <button
                    onClick={() => {
                      alert('Translations Saved to Local drafts! Go to "Save & Publish" to push updates live.');
                      setActiveTab('git-push');
                    }}
                    style={{
                      padding: '10px 20px',
                      background: colors.btnPrimaryBg,
                      color: colors.btnPrimaryText,
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Deploy Updates &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Save & Publish (GitHub API Sync) */}
        {activeTab === 'git-push' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: isLightMode ? '#2271B1' : '#C5A86E' }}>Apply & Publish Changes</h1>
            <p style={{ color: colors.textSecondary, fontSize: '16px', marginBottom: '32px' }}>
              Since Travelling Through Morocco is a statically pre-compiled Next.js website (SSG), saving updates inside this panel writes to your browser's local state. To make your edits live on the internet, you can use either option below.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              
              {/* Option A: GitHub Automatic Deployment */}
              <div style={{ background: colors.bgCard, border: colors.border, padding: '32px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: isLightMode ? '#2271B1' : '#C5A86E' }}>Option A: Direct GitHub Publish (Automatic)</h3>
                <p style={{ color: colors.textMuted, fontSize: '13px', marginBottom: '24px' }}>
                  Input a GitHub Personal Access Token (PAT) to commit and publish updates instantly. This triggers the VPS automated rebuild.
                </p>

                <form onSubmit={saveGitSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: colors.textMuted, textTransform: 'uppercase', marginBottom: '6px' }}>GitHub Repo Path</label>
                    <input 
                      type="text" 
                      value={githubRepo} 
                      onChange={e => setGithubRepo(e.target.value)} 
                      required 
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)', color: colors.textPrimary, fontSize: '13px' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: colors.textMuted, textTransform: 'uppercase', marginBottom: '6px' }}>Personal Access Token (PAT)</label>
                    <input 
                      type="password" 
                      value={githubToken} 
                      onChange={e => setGithubToken(e.target.value)} 
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" 
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)', color: colors.textPrimary, fontSize: '13px' }} 
                    />
                  </div>
                  <button type="submit" style={{ padding: '10px 14px', background: 'rgba(197, 168, 110, 0.15)', color: isLightMode ? '#2271B1' : '#C5A86E', border: '1px solid rgba(197, 168, 110, 0.3)', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Save Credentials Locally
                  </button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button 
                    onClick={() => pushToGitHub('src/data/blogPosts.ts', getBlogPostsCode())}
                    style={{ width: '100%', padding: '12px', background: colors.btnPrimaryBg, color: colors.btnPrimaryText, fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                  >
                    🚀 Publish Blog Articles ({blogPosts.length} posts)
                  </button>
                  <button 
                    onClick={() => pushToGitHub('src/data/tours.ts', getToursCode())}
                    style={{ width: '100%', padding: '12px', background: 'transparent', color: isLightMode ? '#2271B1' : '#C5A86E', border: '2px solid #C5A86E', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    🚀 Publish Tours Data ({tours.length} tours)
                  </button>
                </div>

                {gitStatus && (
                  <div style={{ background: colors.bgApp, border: isLightMode ? '1px dashed #8c8f94' : '1px dashed rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '8px', marginTop: '20px', fontSize: '13px', color: colors.textSecondary, fontFamily: 'monospace' }}>
                    <strong>Status:</strong> {gitStatus}
                  </div>
                )}
              </div>

              <div style={{ background: colors.bgCard, border: colors.border, padding: '32px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: isLightMode ? '#2271B1' : '#C5A86E' }}>Option B: Manual Code Exporter (Offline)</h3>
                  <p style={{ color: colors.textMuted, fontSize: '13px', marginBottom: '24px' }}>
                    Download the TypeScript database files directly and replace them inside the project path (`src/data/`) to deploy changes manually.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>Export blogPosts.ts</h4>
                      <p style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '12px' }}>Contains all {blogPosts.length} articles and their multiline HTML translation templates.</p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => downloadFile('blogPosts.ts', getBlogPostsCode())}
                          style={{ padding: '8px 12px', background: 'rgba(255, 255, 255, 0.06)', color: colors.textPrimary, borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '13px' }}
                        >
                          Download blogPosts.ts
                        </button>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(getBlogPostsCode()); alert('Copied blogPosts.ts content to clipboard!'); }}
                          style={{ padding: '8px 12px', background: 'transparent', color: isLightMode ? '#2271B1' : '#C5A86E', border: '1px solid rgba(197, 168, 110, 0.3)', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                        >
                          Copy Code
                        </button>
                      </div>
                    </div>

                    <div style={{ background: colors.bgApp, padding: '16px', borderRadius: '8px', border: colors.border }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>Export tours.ts</h4>
                      <p style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '12px' }}>Contains details, prices, and settings for all {tours.length} active tours.</p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => downloadFile('tours.ts', getToursCode())}
                          style={{ padding: '8px 12px', background: 'rgba(255, 255, 255, 0.06)', color: colors.textPrimary, borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '13px' }}
                        >
                          Download tours.ts
                        </button>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(getToursCode()); alert('Copied tours.ts content to clipboard!'); }}
                          style={{ padding: '8px 12px', background: 'transparent', color: isLightMode ? '#2271B1' : '#C5A86E', border: '1px solid rgba(197, 168, 110, 0.3)', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                        >
                          Copy Code
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(232, 115, 74, 0.05)', border: '1px solid rgba(232, 115, 74, 0.2)', padding: '16px', borderRadius: '8px', marginTop: '24px', fontSize: '13px', color: '#E8734A' }}>
                  <strong>Important:</strong> After copying or replacing these files in the source code, compile the project using <code>npm run build</code> to export the updated static HTML files.
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
