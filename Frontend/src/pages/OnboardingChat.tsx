import React, { useEffect, useMemo, useRef, useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Message = {
  id: string;
  role: 'system' | 'bot' | 'user';
  text: string;
};

type RequiredAnswers = {
  fullName: string;
  age: string;
  educationLevel: string;
  location: string;
  language: string;
  academicStream: string;
  interests: string[]; // at least 3 or text with others
  workStyle: string;
  consent: boolean;
};

type OptionalAnswers = {
  skills?: string[];
  resumeUrl?: string;
  careerGoals?: string;
  notifications?: string[];
};

const initialBotIntro = `Hi! I'm your career companion. I'll ask a few quick questions to personalize your recommendations. You can type your answers or pick from suggestions.`;

// reserved for future rich suggestion UI

const OnboardingChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'm0', role: 'bot', text: initialBotIntro,
  }]);
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [required, setRequired] = useState<RequiredAnswers>({
    fullName: '',
    age: '',
    educationLevel: '',
    location: '',
    language: '',
    academicStream: '',
    interests: [],
    workStyle: '',
    consent: false,
  });
  const [optional, setOptional] = useState<OptionalAnswers>({});
  const listRef = useRef<HTMLDivElement>(null);
  const seededRef = useRef<boolean>(false);
  const [multiInterests, setMultiInterests] = useState<string[]>([]);
  const [otherInterest, setOtherInterest] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // derive full name from signup if stored
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.fullName && !required.fullName) {
          setRequired(r => ({ ...r, fullName: parsed.fullName }));
        }
      } catch {}
    }
  }, []);

  const steps = useMemo(() => [
    {
      key: 'age',
      prompt: 'Your current age?',
      validate: (val: string) => val.trim().length > 0,
      onSave: (val: string) => setRequired(r => ({ ...r, age: val.trim() })),
      suggestions: ['13-15', '16-18', '19-22', '23-26', '27+'],
    },
    {
      key: 'educationLevel',
      prompt: 'Your grade or education level?',
      validate: (val: string) => val.trim().length > 0,
      onSave: (val: string) => setRequired(r => ({ ...r, educationLevel: val.trim() })),
      suggestions: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Diploma', 'Undergraduate', 'Postgraduate', 'Working Professional'],
    },
    {
      key: 'location',
      prompt: 'Where are you based? (City, State)',
      validate: (val: string) => /.+/.test(val.trim()),
      onSave: (val: string) => setRequired(r => ({ ...r, location: val.trim() })),
      placeholder: 'e.g., Bengaluru, Karnataka',
    },
    {
      key: 'language',
      prompt: 'Preferred language for the app?',
      validate: (val: string) => val.trim().length > 0,
      onSave: (val: string) => setRequired(r => ({ ...r, language: val.trim() })),
      suggestions: ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu'],
    },
    {
      key: 'academicStream',
      prompt: 'What is your academic stream / area of study?',
      validate: (val: string) => val.trim().length > 0,
      onSave: (val: string) => setRequired(r => ({ ...r, academicStream: val.trim() })),
      suggestions: ['Science', 'Commerce', 'Arts/Humanities', 'Computer Science', 'Other'],
    },
    {
      key: 'interests',
      prompt: 'Select or type at least 3 interests/aspirations (comma separated).',
      validate: (val: string) => {
        const arr = val.split(',').map(v => v.trim()).filter(Boolean);
        return arr.length >= 3;
      },
      onSave: (val: string) => {
        const arr = val.split(',').map(v => v.trim()).filter(Boolean);
        setRequired(r => ({ ...r, interests: arr }));
      },
      suggestions: ['AI/ML', 'Design', 'Entrepreneurship', 'Healthcare', 'Finance', 'Research'],
    },
    {
      key: 'workStyle',
      prompt: 'Preferred work style/environment?',
      validate: (val: string) => val.trim().length > 0,
      onSave: (val: string) => setRequired(r => ({ ...r, workStyle: val.trim() })),
      suggestions: ['Remote', 'Hybrid', 'On-site', 'Individual Contributor', 'Team Oriented'],
    },
    {
      key: 'consent',
      prompt: 'Do you consent to data usage as per our privacy policy? Please type "I agree" to proceed.',
      validate: (val: string) => /i\s*agree/i.test(val.trim()),
      onSave: () => setRequired(r => ({ ...r, consent: true })),
    },
    {
      key: 'skills',
      prompt: 'Optional: List current skills/certifications/achievements (comma separated).',
      validate: () => true,
      onSave: (val: string) => {
        if (!val.trim()) return;
        setOptional(o => ({ ...o, skills: val.split(',').map(v => v.trim()).filter(Boolean) }));
      },
    },
    {
      key: 'resumeUrl',
      prompt: 'Optional: Provide a resume/academic record link (Google Drive, etc.).',
      validate: () => true,
      onSave: (val: string) => {
        if (!val.trim()) return;
        setOptional(o => ({ ...o, resumeUrl: val.trim() }));
      },
    },
    {
      key: 'careerGoals',
      prompt: 'Optional: Your longer-term career goals (free text).',
      validate: () => true,
      onSave: (val: string) => {
        if (!val.trim()) return;
        setOptional(o => ({ ...o, careerGoals: val.trim() }));
      },
    },
    {
      key: 'notifications',
      prompt: 'Optional: Notification preferences (job alerts, newsletters, mentoring) comma separated.',
      validate: () => true,
      onSave: (val: string) => {
        if (!val.trim()) return;
        setOptional(o => ({ ...o, notifications: val.split(',').map(v => v.trim()).filter(Boolean) }));
      },
    },
  ], []);

  useEffect(() => {
    // Seed first step prompt after intro (guard against StrictMode double-effects)
    if (!seededRef.current && messages.length === 1) {
      const first = steps[0];
      setMessages(m => [...m, { id: 'p0', role: 'bot', text: first.prompt }]);
      seededRef.current = true;
    }
  }, [steps, messages.length]);

  const optionalKeys = ['skills','resumeUrl','careerGoals','notifications'];

  const handleSend = async (val: string) => {
    const trimmed = val.trim();

    const current = steps[Math.min(step, steps.length - 1)];
    const isOptional = optionalKeys.includes(current.key as string);

    if (!trimmed && isOptional) {
      // silently skip optional question and advance
      const nextStep = step + 1;
      setStep(nextStep);
      const next = steps[nextStep];
      if (next) {
        setMessages(m => [...m, { id: `p${m.length}`, role: 'bot', text: next.prompt }]);
      } else {
        // Skipped the last question: finalize and show Next
        const token = localStorage.getItem('token');
        if (token) {
          await axios.post('http://localhost:3000/api/auth/onboarding', { ...required, ...optional }, {
            headers: {
              'x-auth-token': token,
            },
          });
        }
        setMessages(m => [...m, { id: `d${m.length}`, role: 'bot', text: 'Thanks! Your profile is ready. Click Next to continue to your dashboard.' }]);
        setCompleted(true);
      }
      return;
    }
    if (!trimmed) return;

    const valid = current.validate(trimmed);

    setMessages(m => [...m, { id: `u${m.length}`, role: 'user', text: trimmed }]);

    if (!valid) {
      setMessages(m => [...m, { id: `e${m.length}`, role: 'bot', text: 'Please provide a valid response to continue.' }]);
      return;
    }

    current.onSave(trimmed);
    const nextStep = step + 1;
    setStep(nextStep);
    const next = steps[nextStep];
    if (next) {
      setMessages(m => [...m, { id: `p${m.length}`, role: 'bot', text: next.prompt }]);
    } else {
      // Done: persist data and show Next button to continue
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('http://localhost:3000/api/auth/onboarding', { ...required, ...optional }, {
          headers: {
            'x-auth-token': token,
          },
        });
      }
      setMessages(m => [...m, { id: `d${m.length}`, role: 'bot', text: 'Thanks! Your profile is ready. Click Next to continue to your dashboard.' }]);
      setCompleted(true);
    }
  };

  const currentSuggestions = steps[step]?.suggestions as string[] | undefined;
  const currentKey = steps[step]?.key as string | undefined;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] text-gray-900 dark:text-white transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gradient">Tell us about you</h1>
          <ThemeToggle />
        </div>
        <div ref={listRef} className="glass-card glow-sm p-4 h-[65vh] overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id} className={`mb-3 ${msg.role === 'user' ? 'text-right' : ''}`}>
              <div className={`${msg.role === 'user' ? 'inline-block bg-orange-500 text-white' : 'inline-block bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'} px-3 py-2 rounded-lg`}>{msg.text}</div>
            </div>
          ))}
        </div>
        {currentSuggestions && currentSuggestions.length > 0 && (
          <div className="mt-3">
            {currentSuggestions.map((s, i) => (
              <button key={i} onClick={() => handleSend(s)} className="mr-2 mb-2 px-3 py-1 bg-orange-100 dark:bg-gray-700 text-orange-700 dark:text-orange-300 rounded-full text-xs">
                {s}
              </button>
            ))}
          </div>
        )}
        {currentKey === 'interests' && (
          <div className="mt-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">What are your main interests? (Select at least 3)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
              {['Technology','Healthcare','Finance','Education','Arts & Design','Sports','Music','Writing','Research'].map(label => {
                const checked = multiInterests.includes(label);
                return (
                  <label key={label} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-500"
                      checked={checked}
                      onChange={(e) => {
                        setMultiInterests(prev => e.target.checked ? [...prev, label] : prev.filter(v => v !== label));
                      }}
                    />
                    <span className="text-gray-800 dark:text-gray-200">{label}</span>
                  </label>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                value={otherInterest}
                onChange={(e) => setOtherInterest(e.target.value)}
                placeholder="Others (optional)"
                className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="button"
                disabled={(multiInterests.length + (otherInterest ? 1 : 0)) < 3}
                onClick={() => {
                  const joined = [...multiInterests, ...(otherInterest ? [otherInterest] : [])].join(', ');
                  handleSend(joined);
                  setMultiInterests([]);
                  setOtherInterest('');
                }}
                className="px-4 py-2 rounded-lg text-white disabled:opacity-50 bg-orange-500 hover:bg-orange-600"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (completed) {
              navigate('/');
              return;
            }
            handleSend(input);
            setInput('');
          }}
          className="mt-4 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={steps[step]?.placeholder || 'Type your answer...'}
            className="flex-1 outline-gradient rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={completed}
          />
          {!completed && optionalKeys.includes(steps[step]?.key as string) && (
            <button
              type="button"
              onClick={() => handleSend('')}
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Skip
            </button>
          )}
          <button type="submit" className="btn-image-flow"><span>{completed ? 'Next' : 'Send'}</span></button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingChat;


