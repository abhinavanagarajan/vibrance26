import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { eventId, eventName } = location.state || {}; // Retrieve passed state

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isVitian, setIsVitian] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [teams, setTeams] = useState<any[]>([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [stage, setStage] = useState<'login' | 'team_selection' | 'create_team'>('login');
    const [wsLog, setWsLog] = useState<string[]>([]);
    const [toast, setToast] = useState<{ message: string, type: 'error' | 'success' } | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    // Simple Toast Component
    const Toast = ({ message, type }: { message: string, type: 'error' | 'success' }) => (
        <div style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            backgroundColor: type === 'error' ? '#ef4444' : '#22c55e',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 100,
            animation: 'fadeIn 0.3s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            <span>{message}</span>
            <button onClick={() => setToast(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: '1rem' }}>✕</button>
        </div>
    );

    const showToastMessage = (message: string, type: 'error' | 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    };

    // const handlePayment = () => {
    //     // 1. Create a dynamic form
    //     const form = document.createElement('form');
    //     form.method = 'POST';
    //     const paymentBaseUrl = import.meta.env.VITE_PAYMENT_URL || 'http://127.0.0.1:5001';
    //     form.action = `${paymentBaseUrl}/pay`;

    //     // 2. Add your data
    //     const data: Record<string, string> = {
    //         username: username,
    //         password: password,
    //         validateVitian: isVitian ? '1' : '2',
    //         eventId: eventId
    //     };

    //     for (const key in data) {
    //         const input = document.createElement('input');
    //         input.type = 'hidden';
    //         input.name = key;
    //         input.value = data[key];
    //         form.appendChild(input);
    //     }

    //     // 3. Append and submit
    //     document.body.appendChild(form);
    //     form.submit();
    // };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setWsLog(['Initializing connection...']);

        const payload = {
            username,
            password,
            validateVitian: isVitian ? '1' : '2',
            eid: eventId
        };

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            const wsProtocol = backendUrl.startsWith('https') ? 'wss' : 'ws';
            const wsUrl = `${backendUrl.replace(/^https?:\/\//, '')}/ws/register`;
            const fullWsUrl = `${wsProtocol}://${wsUrl}`;

            console.log('Connecting to:', fullWsUrl);
            const ws = new WebSocket(fullWsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                setWsLog(prev => [...prev, 'Connected. Sending credentials...']);
                ws.send(JSON.stringify(payload));
            };

            ws.onmessage = (event) => {
                try {
                    // Try parsing as JSON first
                    const data = JSON.parse(event.data);

                    // If it's a structured JSON response
                    if (data.status) {
                        console.log('WS Response:', data);
                        if (data.status === 'success') {
                            setWsLog(prev => [...prev, 'Registration successful!']);
                            setSuccess(true);
                            ws.close();
                            // Trigger payment flow
                            // setTimeout(() => {
                            //     handlePayment();
                            // }, 1500);

                            //Redirect back to events
                            setTimeout(() => {
                                navigate('/events');
                            }, 2000);

                        } else if (data.status === 'error') {
                            setWsLog(prev => [...prev, `Error: ${data.message}`]);
                            setError(data.message);
                            showToastMessage(data.message, 'error');
                            setLoading(false);
                            ws.close();
                        } else if (data.status === 'select_team') {
                            setWsLog(prev => [...prev, 'Team selection required.']);
                            setTeams(data.teams);
                            setStage('team_selection');
                            setLoading(false);
                            // Do NOT close the WebSocket here; it stays open for the next step
                        } else if (data.status === 'no_teams') {
                            setWsLog(prev => [...prev, 'No teams found.']);
                            setError('No teams found for this event.');
                            setStage('create_team');
                            setLoading(false);
                            ws.close();
                        } else {
                            // Unhandled status
                            setWsLog(prev => [...prev, `Status: ${data.status}`]);
                        }
                    }
                } catch (err) {
                    // If parse fails, it's a simple text message from backend
                    console.log('WS Message:', event.data);
                    setWsLog(prev => [...prev, event.data]);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket Error:', error);
                setError('Connection error. Please try again.');
                setLoading(false);
            };

            ws.onclose = () => {
                console.log('Connection closed');
            };

        } catch (err: any) {
            console.error('Setup error:', err);
            setError(err.message || 'An error occurred.');
            setLoading(false);
        }
    };

    const handleTeamSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTeam) {
            setError('Please select a team.');
            return;
        }

        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            setError('Connection lost. Please try logging in again.');
            // Optionally reset to login stage
            // setStage('login');
            return;
        }

        setError('');
        setLoading(true);
        setWsLog(prev => [...prev, `Selecting team ${selectedTeam}...`]);

        try {
            // Send the team selection via the existing WebSocket connection
            wsRef.current.send(JSON.stringify({ team_id: selectedTeam }));

            // The success response will be handled by the existing onmessage handler defined in handleLoginSubmit
            // However, we need to make sure the UI updates or we wait. 
            // In the current architecture, the onmessage closure captures the state from the render where handleLoginSubmit was defined? 
            // Actually, React state setters in the callback will work fine. 
            // We just wait for the websocket message to trigger setSuccess(true).

        } catch (err: any) {
            setError(err.message || 'Error joining team.');
            setLoading(false);
        }
    };

    if (!eventId) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <h2>No event selected.</h2>
                <button onClick={() => navigate('/events')} style={{ color: 'var(--color-cyan)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                    Go back to Events
                </button>
            </div>
        );
    }

    if (success) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#4ade80', marginBottom: '1rem' }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>Success!</h2>
                    <p>Redirecting back to events...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Toast Notification */}
            {toast && <Toast message={toast.message} type={toast.type} />}

            {/* Background elements if needed, rely on global background for now */}

            <div style={{
                width: '100%',
                maxWidth: '450px',
                background: 'rgba(122, 122, 122, 0.5)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2.5rem',
                position: 'relative',
                zIndex: 10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontFamily: 'var(--font-display)',
                        color: 'white',
                        marginBottom: '0.5rem'
                    }}>
                        {stage === 'login' ? 'Register' : stage === 'create_team' ? 'Create Team' : 'Select Team'}
                    </h2>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                        {stage === 'login' ? `to ${eventName}` : stage === 'create_team' ? 'No existing teams found' : 'Choose a team to join'}
                    </p>

                    {wsLog.length > 0 && (
                        <div style={{
                            marginTop: '1rem',
                            padding: '0.5rem',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '8px',
                            maxHeight: '100px',
                            overflowY: 'auto',
                            textAlign: 'left',
                            fontSize: '0.8rem',
                            fontFamily: 'monospace',
                            color: '#00ff00'
                        }}>
                            {wsLog.map((log, i) => (
                                <div key={i}>&gt; {log}</div>
                            ))}
                        </div>
                    )}
                </div>

                {stage === 'login' ? (
                    <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Vitian Toggle */}
                        <div style={{
                            display: 'flex',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            padding: '4px',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                left: isVitian ? '4px' : '50%',
                                top: '4px',
                                bottom: '4px',
                                width: 'calc(50% - 4px)',
                                background: '#ff0037ff',
                                borderRadius: '6px',
                                transition: 'left 0.3s ease'
                            }} />
                            <button
                                type="button"
                                onClick={() => setIsVitian(true)}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: 600,
                                    zIndex: 1,
                                    cursor: 'pointer',
                                    transition: 'color 0.3s'
                                }}
                            >
                                VITian
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsVitian(false)}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: 600,
                                    zIndex: 1,
                                    cursor: 'pointer',
                                    transition: 'color 0.3s'
                                }}
                            >
                                Non-VITian
                            </button>
                        </div>

                        {/* Inputs */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    Username / Reg No.
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(0,0,0,0.3)',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                    placeholder="Enter your username"
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem 2.5rem 0.8rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'rgba(0,0,0,0.3)',
                                            color: 'white',
                                            outline: 'none',
                                            fontSize: '1rem'
                                        }}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'rgba(255,255,255,0.5)',
                                            cursor: 'pointer',
                                            padding: 0,
                                            display: 'flex'
                                        }}
                                    >
                                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '0.9rem', textAlign: 'center', padding: '0.3rem', borderRadius: '8px' }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: 'var(--color-cyan)',
                                color: 'black',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginTop: '0.5rem',
                                transition: 'transform 0.2s',
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> Processing...
                                </>
                            ) : (
                                <>
                                    Login & Register <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                ) : stage === 'team_selection' ? (
                    // Team Selection Stage
                    <form onSubmit={handleTeamSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingRight: '0.5rem' }}>
                            {teams.map((team: any) => (
                                <div
                                    key={team.id}
                                    onClick={() => setSelectedTeam(team.id)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        background: selectedTeam === team.id ? 'var(--color-cyan)' : 'rgba(255,255,255,0.05)',
                                        color: selectedTeam === team.id ? 'black' : 'white',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ fontWeight: 'bold' }}>{team.name}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Members: {team.size}</div>
                                </div>
                            ))}
                        </div>

                        {error && (
                            <div style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setStage('login');
                                    setError('');
                                }}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !selectedTeam}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    background: 'var(--color-cyan)',
                                    color: 'black',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: loading || !selectedTeam ? 'not-allowed' : 'pointer',
                                    opacity: loading || !selectedTeam ? 0.7 : 1
                                }}
                            >
                                {loading ? <Loader2 size={20} className="animate-spin" /> : 'Join Team'}
                            </button>
                        </div>
                    </form>
                ) : (
                    // Create Team Stage (No Teams Found)
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px' }}>
                            <p style={{ color: 'white', marginBottom: '1rem' }}>
                                There are <span style={{ textDecoration: 'underline' }}>no teams available</span> for this event yet <br />OR<br /> you have <span style={{ textDecoration: 'underline' }}>already registered</span> for this event.
                            </p>
                            <a
                                href="https://chennaievents.vit.ac.in/vitchennai_vibrance/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    padding: '0.8rem 1.5rem',
                                    background: 'var(--color-cyan)',
                                    color: 'black',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                View Profile <ArrowRight size={16} style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
                            </a>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setStage('login');
                                setError('');
                            }}
                            style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                border: 'none',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            Back to Login
                        </button>
                    </div>
                )}

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </div>
            </div>
        </div >
    );
};

export default Login;
