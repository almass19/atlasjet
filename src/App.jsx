import React, { useState, useEffect, useRef } from 'react';
import {
  Truck, Globe, Shield, Headphones, MapPin,
  ChevronDown, Menu, X, Phone, ArrowRight,
  Package, Clock, Award, FileCheck, Plus, Minus
} from 'lucide-react';

/* ─── Custom social SVG icons ─── */
const IconInstagram = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const IconWhatsapp = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ─── Design tokens ─── */
const C = {
  primary:   '#00113a',
  secondary: '#ab3600',
  surface:   '#fbf8fe',
  surfaceVar:'#f0edf4',
  onSurface: '#1b1b1f',
  muted:     '#5c5f6e',
  white:     '#ffffff',
};

/* ─── Injected CSS ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');

  h1,h2,h3,h4,h5,h6,.font-manrope { font-family:'Manrope',system-ui,sans-serif; }
  body { font-family:'Inter',system-ui,sans-serif; }

  @keyframes revealUp {
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes trackerPulse {
    0%,100% { box-shadow:0 0 0 0 rgba(171,54,0,.4); }
    50%     { box-shadow:0 0 0 12px rgba(171,54,0,0); }
  }
  @keyframes slideGrad {
    from { background-position: 0% 50%; }
    to   { background-position: 100% 50%; }
  }
  @keyframes countUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes modalIn {
    from { opacity:0; transform:scale(.96) translateY(16px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
  @keyframes spin {
    to { transform:rotate(360deg); }
  }

  .reveal { opacity:0; transform:translateY(32px); transition:opacity .6s ease, transform .6s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }

  /* Nav */
  .nav-base {
    position:fixed; top:0; left:0; right:0; z-index:100;
    transition:background .3s, box-shadow .3s, backdrop-filter .3s;
  }
  .nav-scrolled {
    background:rgba(251,248,254,.88);
    backdrop-filter:blur(20px);
    box-shadow:0 1px 0 rgba(0,17,58,.08);
  }

  /* Buttons */
  .btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    background:${C.secondary}; color:#fff;
    padding:14px 28px; border-radius:10px;
    font-family:'Manrope',sans-serif; font-weight:700; font-size:.95rem;
    border:none; cursor:pointer;
    transition:background .2s, transform .15s, box-shadow .2s;
    box-shadow:0 4px 16px rgba(171,54,0,.28);
  }
  .btn-primary:hover {
    background:#8f2c00; transform:translateY(-1px);
    box-shadow:0 8px 24px rgba(171,54,0,.38);
  }
  .btn-ghost {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:${C.primary};
    padding:13px 28px; border-radius:10px;
    font-family:'Manrope',sans-serif; font-weight:700; font-size:.95rem;
    border:2px solid rgba(0,17,58,.2); cursor:pointer;
    transition:border-color .2s, background .2s;
  }
  .btn-ghost:hover { border-color:${C.primary}; background:rgba(0,17,58,.05); }
  .btn-ghost-inv {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:#fff;
    padding:13px 28px; border-radius:10px;
    font-family:'Manrope',sans-serif; font-weight:700; font-size:.95rem;
    border:2px solid rgba(255,255,255,.35); cursor:pointer;
    transition:border-color .2s, background .2s;
  }
  .btn-ghost-inv:hover { border-color:#fff; background:rgba(255,255,255,.1); }

  /* Hero */
  .hero-section {
    background:${C.primary};
    min-height:100svh;
    display:flex; flex-direction:column; justify-content:flex-end;
    position:relative; overflow:hidden;
  }
  .hero-img {
    position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
    opacity:.35; mix-blend-mode:luminosity;
  }
  .hero-gradient {
    position:absolute; inset:0;
    background:linear-gradient(to top, ${C.primary} 20%, transparent 70%);
  }
  .hero-content { position:relative; z-index:2; }

  /* Feature cards */
  .feat-card {
    background:${C.surfaceVar}; border-radius:12px; padding:28px 24px;
    transition:transform .25s, box-shadow .25s;
  }
  .feat-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,17,58,.1); }

  /* Bento grid */
  .bento-grid {
    display:grid;
    grid-template-columns:repeat(12,1fr);
    grid-template-rows:auto;
    gap:16px;
  }
  .bento-card {
    border-radius:16px; overflow:hidden; position:relative;
    min-height:280px;
  }
  .bento-img { width:100%; height:100%; object-fit:cover; display:block; }
  .bento-overlay {
    position:absolute; inset:0;
    background:linear-gradient(to top, rgba(0,17,58,.88) 0%, transparent 55%);
    display:flex; flex-direction:column; justify-content:flex-end;
    padding:24px;
  }
  .bento-c1 { grid-column:span 7; }
  .bento-c2 { grid-column:span 5; }
  .bento-c3 { grid-column:span 5; }
  .bento-c4 { grid-column:span 7; }

  /* Kinetic tracker */
  .tracker-bar {
    height:6px; border-radius:3px;
    background:linear-gradient(90deg,${C.secondary},${C.primary},${C.secondary});
    background-size:200% 100%;
    animation:slideGrad 3s linear infinite;
  }
  .tracker-pulse {
    width:14px; height:14px; border-radius:50%;
    background:${C.secondary};
    animation:trackerPulse 1.8s ease-in-out infinite;
  }

  /* FAQ accordion */
  .faq-item {
    border-radius:10px; overflow:hidden;
    background:${C.surfaceVar};
    margin-bottom:8px;
  }
  .faq-q {
    width:100%; text-align:left; background:transparent; border:none;
    padding:20px 24px; cursor:pointer; display:flex; justify-content:space-between; align-items:center;
    font-family:'Manrope',sans-serif; font-weight:600; font-size:1rem; color:${C.onSurface};
  }
  .faq-a {
    overflow:hidden; transition:max-height .35s ease, padding .35s ease;
    max-height:0; padding:0 24px;
  }
  .faq-a.open { max-height:300px; padding:0 24px 20px; }

  /* Modal */
  .modal-backdrop {
    position:fixed; inset:0; z-index:200;
    background:rgba(0,17,58,.5); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center; padding:16px;
  }
  .modal-box {
    background:#fff; border-radius:20px; width:100%; max-width:520px;
    padding:40px; position:relative;
    animation:modalIn .3s ease;
    max-height:90svh; overflow-y:auto;
  }

  /* Form inputs */
  .form-input {
    width:100%; padding:14px 16px; border-radius:10px;
    background:${C.surfaceVar}; border:2px solid transparent;
    font-family:'Inter',sans-serif; font-size:.95rem; color:${C.onSurface};
    outline:none; transition:border-color .2s;
  }
  .form-input:focus { border-color:${C.secondary}; }
  .form-select {
    width:100%; padding:14px 16px; border-radius:10px;
    background:${C.surfaceVar}; border:2px solid transparent;
    font-family:'Inter',sans-serif; font-size:.95rem; color:${C.onSurface};
    outline:none; cursor:pointer; transition:border-color .2s;
    appearance:none;
  }
  .form-select:focus { border-color:${C.secondary}; }
  .form-label { display:block; font-size:.8rem; font-weight:600; color:${C.muted}; margin-bottom:6px; letter-spacing:.05em; text-transform:uppercase; }

  /* Spinner */
  .spinner {
    width:22px; height:22px; border:2.5px solid rgba(255,255,255,.3);
    border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite;
  }

  /* Mobile */
  @media(max-width:768px){
    .bento-c1,.bento-c2,.bento-c3,.bento-c4 { grid-column:span 12; min-height:220px; }
    .modal-box { padding:28px 20px; }
  }
`;

/* ─── Reveal hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── AnimCounter ─── */
function AnimCounter({ target, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── CalcModal ─── */
const ROUTES = ['Китай', 'Европа', 'США', 'Россия', 'Другое'];
const CARGO_TYPES = ['Генеральный груз', 'Опасные грузы', 'Скоропортящиеся', 'Крупногабаритный', 'Документы'];

function CalcModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ route: '', cargo: '', weight: '', volume: '', name: '', phone: '' });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate1 = () => {
    const e = {};
    if (!form.route) e.route = 'Выберите маршрут';
    if (!form.cargo) e.cargo = 'Выберите тип груза';
    if (!form.weight || isNaN(form.weight) || +form.weight <= 0) e.weight = 'Укажите вес';
    if (!form.volume || isNaN(form.volume) || +form.volume <= 0) e.volume = 'Укажите объём';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validate2 = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Введите имя';
    if (!form.phone.trim()) e.phone = 'Введите номер';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const baseRate = { 'Китай': 3.2, 'Европа': 4.8, 'США': 5.5, 'Россия': 2.1, 'Другое': 4.0 };
  const estimate = () => {
    const rate = baseRate[form.route] || 3.5;
    const w = +form.weight; const v = +form.volume;
    const chargeable = Math.max(w, v * 167);
    return Math.round(chargeable * rate * 100) / 100;
  };

  const handleNext = () => { if (validate1()) setStep(2); };
  const handleSubmit = () => {
    if (!validate2()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('done'); }, 1400);
  };

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button onClick={onClose} style={{ position:'absolute', top:16, right:16, background:'none', border:'none', cursor:'pointer', color:C.muted }}>
          <X size={22}/>
        </button>

        {step === 1 && (
          <>
            <h3 className="font-manrope" style={{ fontSize:'1.6rem', fontWeight:800, color:C.primary, marginBottom:6 }}>Расчёт стоимости</h3>
            <p style={{ color:C.muted, marginBottom:28, fontSize:'.9rem' }}>Заполните параметры — мы посчитаем ориентировочную стоимость</p>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <label className="form-label">Маршрут</label>
                <select className="form-select" value={form.route} onChange={e => set('route', e.target.value)}>
                  <option value="">Выберите направление</option>
                  {ROUTES.map(r => <option key={r}>{r}</option>)}
                </select>
                {errors.route && <p style={{ color:C.secondary, fontSize:'.8rem', marginTop:4 }}>{errors.route}</p>}
              </div>
              <div>
                <label className="form-label">Тип груза</label>
                <select className="form-select" value={form.cargo} onChange={e => set('cargo', e.target.value)}>
                  <option value="">Выберите тип</option>
                  {CARGO_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
                {errors.cargo && <p style={{ color:C.secondary, fontSize:'.8rem', marginTop:4 }}>{errors.cargo}</p>}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div>
                  <label className="form-label">Вес (кг)</label>
                  <input className="form-input" type="number" placeholder="0" value={form.weight} onChange={e => set('weight', e.target.value)}/>
                  {errors.weight && <p style={{ color:C.secondary, fontSize:'.8rem', marginTop:4 }}>{errors.weight}</p>}
                </div>
                <div>
                  <label className="form-label">Объём (м³)</label>
                  <input className="form-input" type="number" placeholder="0.0" value={form.volume} onChange={e => set('volume', e.target.value)}/>
                  {errors.volume && <p style={{ color:C.secondary, fontSize:'.8rem', marginTop:4 }}>{errors.volume}</p>}
                </div>
              </div>
              <button className="btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:8 }} onClick={handleNext}>
                Рассчитать <ArrowRight size={16}/>
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="font-manrope" style={{ fontSize:'1.6rem', fontWeight:800, color:C.primary, marginBottom:6 }}>Ваш расчёт готов</h3>
            <div style={{ background:C.surfaceVar, borderRadius:12, padding:'20px 24px', marginBottom:24 }}>
              <p style={{ color:C.muted, fontSize:'.85rem', marginBottom:4 }}>Ориентировочная стоимость</p>
              <p className="font-manrope" style={{ fontSize:'2rem', fontWeight:800, color:C.primary }}>от ${estimate().toLocaleString()}</p>
              <p style={{ color:C.muted, fontSize:'.8rem', marginTop:4 }}>{form.route} · {form.weight} кг · {form.volume} м³</p>
            </div>
            <p style={{ color:C.muted, marginBottom:20, fontSize:'.9rem' }}>Оставьте контакты — менеджер уточнит детали и пришлёт точное предложение</p>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div>
                <label className="form-label">Ваше имя</label>
                <input className="form-input" placeholder="Алмас Беков" value={form.name} onChange={e => set('name', e.target.value)}/>
                {errors.name && <p style={{ color:C.secondary, fontSize:'.8rem', marginTop:4 }}>{errors.name}</p>}
              </div>
              <div>
                <label className="form-label">Номер телефона</label>
                <input className="form-input" type="tel" placeholder="+7 (___) ___ __ __" value={form.phone} onChange={e => set('phone', e.target.value)}/>
                {errors.phone && <p style={{ color:C.secondary, fontSize:'.8rem', marginTop:4 }}>{errors.phone}</p>}
              </div>
              <div style={{ display:'flex', gap:10, marginTop:4 }}>
                <button className="btn-ghost" onClick={() => setStep(1)}>Назад</button>
                <button className="btn-primary" style={{ flex:1, justifyContent:'center' }} onClick={handleSubmit} disabled={loading}>
                  {loading ? <span className="spinner"/> : 'Отправить заявку'}
                </button>
              </div>
            </div>
          </>
        )}

        {step === 'done' && (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ width:64, height:64, borderRadius:'50%', background:`${C.secondary}18`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.secondary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="font-manrope" style={{ fontSize:'1.5rem', fontWeight:800, color:C.primary, marginBottom:10 }}>Заявка принята!</h3>
            <p style={{ color:C.muted, marginBottom:28, lineHeight:1.6 }}>Менеджер свяжется с вами в течение 30 минут и пришлёт точное коммерческое предложение.</p>
            <button className="btn-primary" style={{ width:'100%', justifyContent:'center' }} onClick={onClose}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── FAQ item ─── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        {open ? <Minus size={18} color={C.secondary}/> : <Plus size={18} color={C.secondary}/>}
      </button>
      <div className={`faq-a ${open ? 'open' : ''}`}>
        <p style={{ color:C.muted, lineHeight:1.7, fontSize:'.95rem' }}>{a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name:'', phone:'', message:'' });
  const [contactSent, setContactSent] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const setC = (k, v) => setContactForm(f => ({ ...f, [k]: v }));
  const handleContact = (e) => {
    e.preventDefault();
    setContactLoading(true);
    setTimeout(() => { setContactLoading(false); setContactSent(true); }, 1200);
  };

  const navLinks = [
    { label:'Услуги', href:'#services' },
    { label:'О нас', href:'#about' },
    { label:'Отслеживание', href:'#tracker' },
    { label:'FAQ', href:'#faq' },
    { label:'Контакты', href:'#contact' },
  ];

  const BENTO = [
    {
      title:'Авиаперевозки',
      desc:'Срочная доставка по всему миру от 3 дней',
      img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
      cls:'bento-c1',
      icon:<Globe size={22}/>,
    },
    {
      title:'Морские перевозки',
      desc:'FCL и LCL контейнеры из Китая и Европы',
      img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
      cls:'bento-c2',
      icon:<Package size={22}/>,
    },
    {
      title:'Автомобильные перевозки',
      desc:'Сборные и полные грузы по СНГ',
      img:'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80',
      cls:'bento-c3',
      icon:<Truck size={22}/>,
    },
    {
      title:'Таможенное оформление',
      desc:'Полный цикл: декларирование, сертификация, брокерские услуги',
      img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
      cls:'bento-c4',
      icon:<FileCheck size={22}/>,
    },
  ];

  const TRACKER_STEPS = [
    { label:'Принят', done:true },
    { label:'Таможня', done:true },
    { label:'В пути', done:true },
    { label:'Казахстан', done:false },
    { label:'Доставлен', done:false },
  ];

  const FAQ = [
    { q:'Сколько времени занимает доставка из Китая?', a:'Авиаперевозки — от 5 до 10 рабочих дней. Морские контейнеры — от 35 до 55 дней в зависимости от порта отправления и типа контейнера. Автоперевозки — от 18 до 25 дней.' },
    { q:'Работаете ли вы с опасными грузами?', a:'Да, мы работаем с грузами классов опасности 3–9 при наличии необходимой документации. Наши специалисты помогут подготовить все разрешительные документы.' },
    { q:'Как происходит таможенное оформление?', a:'Наши сертифицированные брокеры берут на себя весь процесс: подготовку деклараций, сертификатов соответствия и разрешительных документов. Вам не нужно вникать в бюрократические детали.' },
    { q:'Есть ли страхование груза?', a:'Да, мы предлагаем страхование грузов от всех рисков с покрытием до 100% стоимости товара. Страховка оформляется автоматически по запросу.' },
    { q:'Можно ли отследить груз онлайн?', a:'Конечно. После оформления заявки вы получите личный кабинет с GPS-трекингом в реальном времени и уведомлениями на WhatsApp на каждом этапе.' },
  ];

  return (
    <>
      <style>{STYLES}</style>
      {calcOpen && <CalcModal onClose={() => setCalcOpen(false)}/>}

      {/* ═══ NAV ═══ */}
      <nav className={`nav-base ${scrolled ? 'nav-scrolled' : ''}`}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:68 }}>
          <a href="#" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, background:C.secondary, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Globe size={20} color="#fff"/>
            </div>
            <span className="font-manrope" style={{ fontWeight:800, fontSize:'1.15rem', color: scrolled ? C.primary : '#fff', transition:'color .3s' }}>AtlasJet</span>
          </a>
          <div style={{ display:'flex', alignItems:'center', gap:32 }} className="desktop-nav">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{ textDecoration:'none', fontSize:'.9rem', fontWeight:500, color: scrolled ? C.muted : 'rgba(255,255,255,.8)', transition:'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = scrolled ? C.primary : '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = scrolled ? C.muted : 'rgba(255,255,255,.8)'}>
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <button className="btn-primary" style={{ padding:'10px 20px', fontSize:'.85rem' }} onClick={() => setCalcOpen(true)}>
              Рассчитать стоимость
            </button>
            <button onClick={() => setMenuOpen(o => !o)} style={{ background:'none', border:'none', cursor:'pointer', color: scrolled ? C.primary : '#fff', display:'none' }} className="mob-menu-btn">
              {menuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background:'#fff', borderTop:`1px solid ${C.surfaceVar}`, padding:'16px 24px 20px' }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display:'block', padding:'10px 0', textDecoration:'none', fontWeight:600, color:C.primary, borderBottom:`1px solid ${C.surfaceVar}` }}>
                {l.label}
              </a>
            ))}
            <button className="btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:16 }} onClick={() => { setMenuOpen(false); setCalcOpen(true); }}>
              Рассчитать стоимость
            </button>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="hero-section">
        <img className="hero-img" src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80" alt="logistics"/>
        <div className="hero-gradient"/>
        <div className="hero-content" style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px 100px', width:'100%' }}>
          <div style={{ maxWidth:680 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(171,54,0,.2)', border:'1px solid rgba(171,54,0,.4)', borderRadius:6, padding:'6px 14px', marginBottom:24 }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:C.secondary, display:'inline-block' }}/>
              <span style={{ fontSize:'.8rem', color:'rgba(255,255,255,.9)', fontWeight:500, letterSpacing:'.06em', textTransform:'uppercase' }}>Логистика без границ</span>
            </div>
            <h1 className="font-manrope" style={{ fontSize:'clamp(2.8rem,6vw,5rem)', fontWeight:900, color:'#fff', lineHeight:1.1, letterSpacing:'-.03em', marginBottom:24 }}>
              Доставка грузов<br/>
              <span style={{ color:C.secondary }}>из любой точки</span><br/>
              мира
            </h1>
            <p style={{ fontSize:'1.1rem', color:'rgba(255,255,255,.72)', lineHeight:1.7, marginBottom:40, maxWidth:520 }}>
              Китай, Европа, США — мы обеспечиваем надёжную логистику с таможенным сопровождением и GPS-трекингом для бизнеса в Казахстане.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
              <button className="btn-primary" style={{ fontSize:'1rem', padding:'16px 32px' }} onClick={() => setCalcOpen(true)}>
                Рассчитать стоимость <ArrowRight size={18}/>
              </button>
              <a href="#contact" className="btn-ghost-inv" style={{ fontSize:'1rem', padding:'15px 32px', textDecoration:'none' }}>
                Связаться с нами
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section style={{ background:C.primary }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'48px 24px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:32 }}>
          {[
            { val:1200, suffix:'+', label:'Клиентов' },
            { val:47,   suffix:'',  label:'Стран' },
            { val:98,   suffix:'%', label:'Довольных' },
            { val:8,    suffix:'+', label:'Лет опыта' },
          ].map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <div className="font-manrope" style={{ fontSize:'2.8rem', fontWeight:900, color:'#fff', lineHeight:1 }}>
                <AnimCounter target={s.val} suffix={s.suffix}/>
              </div>
              <div style={{ color:'rgba(255,255,255,.55)', fontSize:'.9rem', marginTop:6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section style={{ background:C.surface, padding:'96px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <p style={{ color:C.secondary, fontWeight:700, fontSize:'.85rem', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Почему AtlasJet</p>
              <h2 className="font-manrope" style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, color:C.primary, letterSpacing:'-.02em' }}>Надёжность на каждом этапе</h2>
            </div>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
            {[
              { icon:<Clock size={28}/>, title:'Точно в срок', desc:'Мониторинг маршрутов в реальном времени. Среднее отклонение от заявленного срока — менее 4 часов.' },
              { icon:<Shield size={28}/>, title:'Страхование груза', desc:'Полное покрытие от утраты и повреждений. Страховой полис оформляется за 15 минут онлайн.' },
              { icon:<FileCheck size={28}/>, title:'Таможенный брокер', desc:'Сертифицированные специалисты возьмут на себя всё: декларации, сертификаты, разрешения.' },
              { icon:<Headphones size={28}/>, title:'Поддержка 24/7', desc:'Персональный менеджер на связи круглосуточно. Среднее время ответа — 4 минуты.' },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="feat-card">
                  <div style={{ width:52, height:52, borderRadius:12, background:`${C.secondary}15`, display:'flex', alignItems:'center', justifyContent:'center', color:C.secondary, marginBottom:20 }}>
                    {f.icon}
                  </div>
                  <h3 className="font-manrope" style={{ fontWeight:700, fontSize:'1.15rem', color:C.primary, marginBottom:10 }}>{f.title}</h3>
                  <p style={{ color:C.muted, lineHeight:1.7, fontSize:'.92rem' }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES BENTO ═══ */}
      <section id="services" style={{ background:C.surfaceVar, padding:'96px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, flexWrap:'wrap', gap:16 }}>
              <div>
                <p style={{ color:C.secondary, fontWeight:700, fontSize:'.85rem', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Направления</p>
                <h2 className="font-manrope" style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, color:C.primary, letterSpacing:'-.02em' }}>Наши услуги</h2>
              </div>
              <button className="btn-ghost" onClick={() => setCalcOpen(true)}>Рассчитать маршрут <ArrowRight size={16}/></button>
            </div>
          </Reveal>
          <div className="bento-grid">
            {BENTO.map((b, i) => (
              <Reveal key={b.title} delay={i * 60} className={b.cls}>
                <div className="bento-card" style={{ height:'100%' }}>
                  <img className="bento-img" src={b.img} alt={b.title}/>
                  <div className="bento-overlay">
                    <div style={{ width:40, height:40, borderRadius:8, background:'rgba(255,255,255,.15)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', marginBottom:12 }}>
                      {b.icon}
                    </div>
                    <h3 className="font-manrope" style={{ fontWeight:800, fontSize:'1.25rem', color:'#fff', marginBottom:6 }}>{b.title}</h3>
                    <p style={{ color:'rgba(255,255,255,.72)', fontSize:'.88rem', lineHeight:1.5 }}>{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KINETIC TRACKER ═══ */}
      <section id="tracker" style={{ background:C.primary, padding:'96px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <p style={{ color:C.secondary, fontWeight:700, fontSize:'.85rem', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>GPS-трекинг</p>
              <h2 className="font-manrope" style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, color:'#fff', letterSpacing:'-.02em', marginBottom:16 }}>Следите за грузом онлайн</h2>
              <p style={{ color:'rgba(255,255,255,.6)', maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>Каждое отправление отслеживается в реальном времени. Уведомления на WhatsApp на каждом этапе пути.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ background:'rgba(255,255,255,.06)', backdropFilter:'blur(20px)', borderRadius:20, padding:'40px 48px' }}>
              {/* Demo tracker */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12, flexWrap:'wrap', gap:8 }}>
                <div>
                  <span style={{ color:'rgba(255,255,255,.5)', fontSize:'.8rem' }}>Номер накладной</span>
                  <p className="font-manrope" style={{ color:'#fff', fontWeight:700, fontSize:'1.1rem', marginTop:2 }}>AJ-2024-08741</p>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(171,54,0,.2)', border:'1px solid rgba(171,54,0,.35)', borderRadius:6, padding:'6px 14px' }}>
                  <div className="tracker-pulse"/>
                  <span style={{ color:C.secondary, fontSize:'.85rem', fontWeight:600 }}>В пути</span>
                </div>
              </div>
              <div style={{ position:'relative', margin:'32px 0' }}>
                <div className="tracker-bar"/>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:20 }}>
                  {TRACKER_STEPS.map((s, i) => (
                    <div key={s.label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                      <div style={{ width:18, height:18, borderRadius:'50%', background: s.done ? C.secondary : 'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        {s.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <span style={{ fontSize:'.78rem', color: s.done ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.35)', fontWeight: s.done ? 600 : 400 }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, borderTop:'1px solid rgba(255,255,255,.1)', paddingTop:28 }}>
                {[
                  { label:'Отправление', val:'Шанхай, CN' },
                  { label:'Назначение', val:'Алматы, KZ' },
                  { label:'Прибытие', val:'12 апр · 14:30' },
                  { label:'Вес', val:'840 кг' },
                ].map(d => (
                  <div key={d.label}>
                    <p style={{ color:'rgba(255,255,255,.4)', fontSize:'.78rem', marginBottom:4 }}>{d.label}</p>
                    <p className="font-manrope" style={{ color:'#fff', fontWeight:700 }}>{d.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ background:C.surface, padding:'96px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:64, alignItems:'center' }}>
          <Reveal>
            <div>
              <p style={{ color:C.secondary, fontWeight:700, fontSize:'.85rem', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:16 }}>О компании</p>
              <h2 className="font-manrope" style={{ fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:800, color:C.primary, letterSpacing:'-.02em', marginBottom:24 }}>
                8 лет строим логистику, которой доверяют
              </h2>
              <p style={{ color:C.muted, lineHeight:1.8, marginBottom:20 }}>
                AtlasJet — казахстанская логистическая компания с офисами в Алматы, Шанхае и Варшаве. Мы специализируемся на импортных поставках для среднего и крупного бизнеса.
              </p>
              <p style={{ color:C.muted, lineHeight:1.8, marginBottom:36 }}>
                Наша команда из 120+ специалистов ежедневно обрабатывает более 200 отправлений, обеспечивая прозрачность на каждом этапе цепочки поставок.
              </p>
              <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <button className="btn-primary" onClick={() => setCalcOpen(true)}>Получить предложение</button>
                <a href="#contact" className="btn-ghost" style={{ textDecoration:'none' }}>Написать нам</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div style={{ position:'relative' }}>
              <div style={{ borderRadius:20, overflow:'hidden', aspectRatio:'4/3' }}>
                <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80" alt="AtlasJet team" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
              <div style={{ position:'absolute', bottom:-20, right:-20, background:C.secondary, borderRadius:16, padding:'20px 24px', boxShadow:'0 16px 48px rgba(171,54,0,.35)' }}>
                <div className="font-manrope" style={{ fontSize:'2.2rem', fontWeight:900, color:'#fff', lineHeight:1 }}>
                  <AnimCounter target={1200} suffix="+"/>
                </div>
                <div style={{ color:'rgba(255,255,255,.8)', fontSize:'.85rem', marginTop:4 }}>довольных клиентов</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" style={{ background:C.surfaceVar, padding:'96px 24px' }}>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:56 }}>
              <p style={{ color:C.secondary, fontWeight:700, fontSize:'.85rem', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Частые вопросы</p>
              <h2 className="font-manrope" style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, color:C.primary, letterSpacing:'-.02em' }}>FAQ</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            {FAQ.map(f => <FaqItem key={f.q} q={f.q} a={f.a}/>)}
          </Reveal>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ background:C.surface, padding:'96px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:64, alignItems:'start' }}>
          <Reveal>
            <div>
              <p style={{ color:C.secondary, fontWeight:700, fontSize:'.85rem', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:16 }}>Контакты</p>
              <h2 className="font-manrope" style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:800, color:C.primary, letterSpacing:'-.02em', marginBottom:20 }}>
                Обсудим вашу логистику
              </h2>
              <p style={{ color:C.muted, lineHeight:1.7, marginBottom:40 }}>Расскажите о вашем проекте — мы подберём оптимальный маршрут и условия.</p>
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                {[
                  { icon:<Phone size={20}/>, label:'Телефон', val:'+7 (727) 123-45-67', href:'tel:+77271234567' },
                  { icon:<MapPin size={20}/>, label:'Адрес', val:'Алматы, ул. Достык 12, офис 501', href:null },
                  { icon:<IconWhatsapp size={20}/>, label:'WhatsApp', val:'+7 (701) 123-45-67', href:'https://wa.me/77011234567' },
                ].map(c => (
                  <div key={c.label} style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
                    <div style={{ width:44, height:44, borderRadius:10, background:`${C.secondary}15`, display:'flex', alignItems:'center', justifyContent:'center', color:C.secondary, flexShrink:0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ color:C.muted, fontSize:'.8rem', fontWeight:600, marginBottom:2 }}>{c.label}</p>
                      {c.href ? (
                        <a href={c.href} style={{ color:C.primary, fontWeight:600, textDecoration:'none', fontSize:'.95rem' }}>{c.val}</a>
                      ) : (
                        <p style={{ color:C.primary, fontWeight:600, fontSize:'.95rem' }}>{c.val}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ background:C.surfaceVar, borderRadius:20, padding:'40px 36px' }}>
              {contactSent ? (
                <div style={{ textAlign:'center', padding:'24px 0' }}>
                  <div style={{ width:60, height:60, borderRadius:'50%', background:`${C.secondary}15`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.secondary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="font-manrope" style={{ fontWeight:800, fontSize:'1.4rem', color:C.primary, marginBottom:10 }}>Сообщение отправлено!</h3>
                  <p style={{ color:C.muted, lineHeight:1.6 }}>Мы ответим в течение 30 минут в рабочее время.</p>
                </div>
              ) : (
                <form onSubmit={handleContact} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                  <h3 className="font-manrope" style={{ fontWeight:800, fontSize:'1.4rem', color:C.primary, marginBottom:4 }}>Написать нам</h3>
                  <div>
                    <label className="form-label">Ваше имя</label>
                    <input className="form-input" required placeholder="Алмас Бекенов" value={contactForm.name} onChange={e => setC('name', e.target.value)}/>
                  </div>
                  <div>
                    <label className="form-label">Телефон</label>
                    <input className="form-input" required type="tel" placeholder="+7 (___) ___ __ __" value={contactForm.phone} onChange={e => setC('phone', e.target.value)}/>
                  </div>
                  <div>
                    <label className="form-label">Сообщение</label>
                    <textarea className="form-input" rows={4} placeholder="Опишите ваш груз и маршрут..." value={contactForm.message} onChange={e => setC('message', e.target.value)} style={{ resize:'vertical' }}/>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width:'100%', justifyContent:'center' }} disabled={contactLoading}>
                    {contactLoading ? <span className="spinner"/> : <>Отправить заявку <ArrowRight size={16}/></>}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background:C.primary, color:'rgba(255,255,255,.6)', padding:'64px 24px 32px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:48, marginBottom:56 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ width:36, height:36, background:C.secondary, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Globe size={20} color="#fff"/>
                </div>
                <span className="font-manrope" style={{ fontWeight:800, fontSize:'1.1rem', color:'#fff' }}>AtlasJet</span>
              </div>
              <p style={{ lineHeight:1.7, fontSize:'.9rem', maxWidth:220 }}>Логистическая компания в Казахстане. Доставка из Китая, Европы и США.</p>
              <div style={{ display:'flex', gap:12, marginTop:20 }}>
                <a href="https://instagram.com/atlasjet.kz" target="_blank" rel="noopener noreferrer"
                  style={{ width:36, height:36, borderRadius:8, background:'rgba(255,255,255,.1)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,.7)', textDecoration:'none', transition:'background .2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.2)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,.1)'}>
                  <IconInstagram size={17}/>
                </a>
                <a href="https://wa.me/77011234567" target="_blank" rel="noopener noreferrer"
                  style={{ width:36, height:36, borderRadius:8, background:'rgba(255,255,255,.1)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,.7)', textDecoration:'none', transition:'background .2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.2)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,.1)'}>
                  <IconWhatsapp size={17}/>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-manrope" style={{ color:'#fff', fontWeight:700, marginBottom:16, fontSize:'.95rem' }}>Услуги</h4>
              {['Авиаперевозки','Морские перевозки','Автоперевозки','Таможенное оформление','Страхование грузов'].map(l => (
                <a key={l} href="#services" style={{ display:'block', color:'rgba(255,255,255,.55)', textDecoration:'none', marginBottom:10, fontSize:'.9rem', transition:'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#fff'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.55)'}>
                  {l}
                </a>
              ))}
            </div>
            <div>
              <h4 className="font-manrope" style={{ color:'#fff', fontWeight:700, marginBottom:16, fontSize:'.95rem' }}>Компания</h4>
              {['О нас','Контакты','FAQ','Трекинг груза'].map(l => (
                <a key={l} href="#about" style={{ display:'block', color:'rgba(255,255,255,.55)', textDecoration:'none', marginBottom:10, fontSize:'.9rem', transition:'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#fff'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.55)'}>
                  {l}
                </a>
              ))}
            </div>
            <div>
              <h4 className="font-manrope" style={{ color:'#fff', fontWeight:700, marginBottom:16, fontSize:'.95rem' }}>Связь</h4>
              <p style={{ fontSize:'.9rem', marginBottom:8 }}>+7 (727) 123-45-67</p>
              <p style={{ fontSize:'.9rem', marginBottom:8 }}>info@atlasjet.kz</p>
              <p style={{ fontSize:'.9rem' }}>Алматы, ул. Достык 12</p>
              <button className="btn-primary" style={{ marginTop:20, padding:'10px 20px', fontSize:'.85rem' }} onClick={() => setCalcOpen(true)}>
                Рассчитать стоимость
              </button>
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,.1)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
            <p style={{ fontSize:'.85rem' }}>© 2024 AtlasJet. Все права защищены.</p>
            <p style={{ fontSize:'.85rem' }}>Алматы, Казахстан</p>
          </div>
        </div>
      </footer>

      {/* Mobile nav styles */}
      <style>{`
        @media(max-width:900px){
          .desktop-nav { display:none !important; }
          .mob-menu-btn { display:flex !important; }
        }
        @media(min-width:901px){
          .mob-menu-btn { display:none !important; }
        }
      `}</style>
    </>
  );
}
