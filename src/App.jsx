import React, { useState, useEffect, useRef } from 'react';
import { 
  Layout, 
  Settings, 
  Smartphone, 
  Globe, 
  ExternalLink, 
  MessageSquare, 
  ShieldCheck, 
  Zap,
  DollarSign,
  Plus, 
  X,
  Lock,
  Unlock,
  ChevronLeft,
  ChevronRight,
  Info,
  Trash2,
  Save,
  Image as ImageIcon,
  Upload,
  Camera
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPrintIndex, setCurrentPrintIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [editProject, setEditProject] = useState(null);

  // --- ESTADOS PARA EFEITOS TECNOLÓGICOS ---
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const logoRef = useRef(null);
  const canvasRef = useRef(null);

  // --- EFEITO STARFIELD (FUNDO DE PARTÍCULAS) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#06b6d4';

      stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = h;
          star.x = Math.random() * w;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Efeito de Rastro do Mouse (Smooth Trail)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let requestRef;
    const updateTrail = () => {
      setTrailPos(prev => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.15,
        y: prev.y + (cursorPos.y - prev.y) * 0.15
      }));
      requestRef = requestAnimationFrame(updateTrail);
    };
    requestRef = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(requestRef);
  }, [cursorPos]);

  // Efeito Magnético na Logo
  const handleMagneticMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = logoRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = (clientX - centerX) * 0.4;
    const moveY = (clientY - centerY) * 0.4;
    setMagneticPos({ x: moveX, y: moveY });
  };

  const resetMagnetic = () => setMagneticPos({ x: 0, y: 0 });

  // Animação de Clique Futurista
  const handleGlobalClick = (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
  };

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const initialProjetos = [
    {
      id: 1,
      titulo: "RepairControl",
      categoria: "Gestão",
      descricao: "Sistema robusto para gestão de ordens de serviço e fluxo de oficina. Totalmente integrado com Firebase.",
      descricaoLonga: "O RepairControl foi desenvolvido para centralizar toda a operação de centros automotivos. Desde o checkout do cliente até o controlo de peças em stock. Utiliza tecnologia de sincronização em tempo real para que múltiplos mecânicos possam atualizar o status do serviço simultaneamente.",
      status: "Estável",
      tags: ["Firebase", "React", "Mobile-First"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80",
      prints: [
        "https://images.unsplash.com/photo-1551288049-bbda3ef66857?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
      ],
      url: "https://repaircontrol-378f9.web.app/" 
    },
    {
      id: 2,
      titulo: "Vistoria Pro",
      categoria: "Imobiliário",
      descricao: "Ferramenta de captura e relatório de vistorias técnicas com geração de PDF automática.",
      descricaoLonga: "Uma solução completa para corretores e peritos. O aplicativo permite tirar fotos geolocalizadas, anotar danos em tempo real e gerar um laudo em PDF assinado digitalmente antes mesmo de sair do imóvel visitado.",
      status: "Beta",
      tags: ["Cloud Storage", "PWA", "Offline-Ready"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
      prints: [
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=1000&q=80"
      ],
      url: "#contato"
    },
    {
      id: 3,
      titulo: "Gestão de Estoque",
      categoria: "Comércio",
      descricao: "Controle de inventário inteligente com alertas de reposição e análise de giro de produtos.",
      descricaoLonga: "Software focado na redução de perdas. Inclui leitura de código de barras via câmara do telemóvel, integração com fornecedores e um algoritmo preditivo que avisa quando um produto está prestes a acabar com base no histórico de vendas.",
      status: "Adaptável",
      tags: ["Analytics", "Dashboard", "Firestore"],
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80",
      prints: [
        "https://images.unsplash.com/photo-1586769852044-692d6e3924ff?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1000&q=80"
      ],
      url: "#contato"
    }
  ];

  const [projetos, setProjetos] = useState(initialProjetos);
  const [novoProjeto, setNovoProjeto] = useState({
    titulo: '', categoria: 'Gestão', descricao: '', status: 'Em Desenvolvimento', tags: '', image: '', url: '', 
    descricaoLonga: '', prints: []
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      setShowLoginPrompt(false);
      setAdminPassword('');
    } else {
      alert("Senha incorreta!");
    }
  };

  const handleLogout = () => setIsAdmin(false);

  const handleCardClick = (projeto) => {
    setSelectedProject(projeto);
    setEditProject({...projeto});
    setCurrentPrintIndex(0);
  };

  const handleUpdateProject = () => {
    setProjetos(prev => prev.map(p => p.id === editProject.id ? editProject : p));
    setSelectedProject(editProject);
    alert("Projeto atualizado com sucesso!");
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.")) {
      setProjetos(prev => prev.filter(p => p.id !== id));
      setSelectedProject(null);
    }
  };

  // Funções para processar arquivos de imagem (Para leigos)
  const handleImageUpload = (e, target, isMultiple = false) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        if (target === 'novo') {
          if (isMultiple) {
            setNovoProjeto(prev => ({ ...prev, prints: [...prev.prints, base64] }));
          } else {
            setNovoProjeto(prev => ({ ...prev, image: base64 }));
          }
        } else if (target === 'edit') {
          if (isMultiple) {
            setEditProject(prev => ({ ...prev, prints: [...prev.prints, base64] }));
          } else {
            setEditProject(prev => ({ ...prev, image: base64 }));
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePrint = (index, target) => {
    if (target === 'novo') {
      setNovoProjeto(prev => ({ ...prev, prints: prev.prints.filter((_, i) => i !== index) }));
    } else {
      setEditProject(prev => ({ ...prev, prints: prev.prints.filter((_, i) => i !== index) }));
      if (currentPrintIndex >= index && currentPrintIndex > 0) setCurrentPrintIndex(prev => prev - 1);
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const newId = projetos.length > 0 ? Math.max(...projetos.map(p => p.id)) + 1 : 1;
    const tagsArray = typeof novoProjeto.tags === 'string' ? novoProjeto.tags.split(',').map(tag => tag.trim()).filter(Boolean) : novoProjeto.tags;

    const projectToAdd = {
      ...novoProjeto,
      id: newId,
      tags: tagsArray.length > 0 ? tagsArray : ['Novo'],
      image: novoProjeto.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      prints: novoProjeto.prints.length > 0 ? novoProjeto.prints : [novoProjeto.image]
    };

    setProjetos([projectToAdd, ...projetos]);
    setIsModalOpen(false);
    setNovoProjeto({ titulo: '', categoria: 'Gestão', descricao: '', status: 'Em Desenvolvimento', tags: '', image: '', url: '', descricaoLonga: '', prints: [] });
  };

  const handleVisitProject = (url) => {
    if (!url || url === '#contato') {
      setSelectedProject(null);
      setTimeout(() => scrollToSection('contato'), 300);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-cyan-500 selection:text-white cursor-none relative">
      
      {/* --- CANVAS DO FUNDO (STARFIELD) --- */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* --- ESTILOS GLOBAIS DE EFEITOS --- */}
      <style>{`
        .cursor-trail {
          position: fixed;
          width: 20px;
          height: 20px;
          background: rgba(6, 182, 212, 0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          mix-blend-mode: screen;
          transition: width 0.3s, height 0.3s;
        }
        .cursor-dot {
          position: fixed;
          width: 6px;
          height: 6px;
          background: #06b6d4;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px #06b6d4;
        }
        .click-ripple {
          position: fixed;
          border: 2px solid #06b6d4;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          animation: ripple-effect 0.8s cubic-bezier(0, 0, 0.2, 1) forwards;
        }
        @keyframes ripple-effect {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 150px; height: 150px; opacity: 0; }
        }
        .tech-icon-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tech-icon-hover:hover {
          filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.8));
          transform: translateY(-2px) scale(1.1);
        }
        .scanline-card:hover::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 2px;
          background: rgba(6, 182, 212, 0.5);
          animation: scan 2s linear infinite;
          z-index: 20;
        }
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        input[type="file"]::file-selector-button {
          display: none;
        }
      `}</style>

      {/* --- ELEMENTOS DO CURSOR --- */}
      <div className="cursor-trail hidden md:block" style={{ left: trailPos.x, top: trailPos.y }}></div>
      <div className="cursor-dot hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }}></div>

      {/* --- NAVEGAÇÃO --- */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            ref={logoRef}
            onMouseMove={handleMagneticMove}
            onMouseLeave={resetMagnetic}
            style={{ transform: `translate(${magneticPos.x}px, ${magneticPos.y}px)`, transition: 'transform 0.1s ease-out' }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => scrollToSection('inicio')}
          >
            <div className="relative flex items-center py-2">
              <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col justify-center relative z-10">
                <span className="font-black text-2xl tracking-tighter leading-none text-white group-hover:text-cyan-400 transition-colors">INFOTECH</span>
                <span className="text-[10px] font-bold text-cyan-500 tracking-[0.3em] leading-none mt-1.5 uppercase">Soluções em TI</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            <button onClick={() => scrollToSection('inicio')} className="px-6 py-2.5 rounded-full text-gray-400 hover:bg-white hover:text-black transition-all">Início</button>
            <button onClick={() => scrollToSection('portfolio')} className="px-6 py-2.5 rounded-full text-gray-400 hover:bg-white hover:text-black transition-all">Portfólio</button>
            {isAdmin && (
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 hover:bg-red-500 hover:text-white transition-all mr-2">
                <Unlock className="w-4 h-4" /> Sair Admin
              </button>
            )}
            <button onClick={() => scrollToSection('contato')} className="ml-4 px-6 py-2.5 bg-cyan-500 text-black rounded-full hover:bg-cyan-400 hover:scale-105 transition-all shadow-lg shadow-cyan-500/10">Orçamento</button>
          </div>
        </div>
      </nav>

      {/* --- CONTEÚDO PRINCIPAL (Z-INDEX SUPERIOR AO CANVAS) --- */}
      <div className="relative z-10">
        {/* --- HERO --- */}
        <header id="inicio" className="relative py-32 px-6 overflow-hidden scroll-mt-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent -z-10"></div>
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-500 text-xs font-bold uppercase tracking-widest mb-4">
              {isAdmin ? 'Painel de Administração Ativo' : 'InfoTech • Inovação Digital'}
            </span>
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter text-white">Transformamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tecnologia</span> em Lucro.</h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">Desenvolvemos aplicações robustas que se adaptam ao seu negócio.</p>
          </div>
        </header>

        {/* --- GRID DE PROJETOS --- */}
        <main id="portfolio" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-3 tracking-tight text-white">Projetos InfoTech</h2>
              <p className="text-gray-500 text-lg">Cases de sucesso e portfólio de soluções.</p>
            </div>
            <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10">
              {['todos', 'gestão', 'comércio', 'imobiliário'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeTab === tab ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'}`}>{tab}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isAdmin && (
              <article onClick={() => setIsModalOpen(true)} className="flex flex-col h-full justify-center items-center group bg-cyan-500/5 border border-dashed border-cyan-500/30 rounded-[2.5rem] p-10 cursor-pointer hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-500 min-h-[500px]">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-all mb-4">
                  <Plus className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold text-cyan-500">Novo Projeto</h3>
                <p className="text-gray-500 text-xs mt-3 text-center">Adicione um novo case ao site.</p>
              </article>
            )}

            {projetos
              .filter(p => activeTab === 'todos' || p.categoria.toLowerCase() === activeTab)
              .map((projeto) => (
              <article key={projeto.id} onClick={() => handleCardClick(projeto)} className="flex flex-col h-full group bg-[#111] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/50 transition-all duration-500 cursor-pointer scanline-card relative">
                <div className="relative h-64 overflow-hidden shrink-0">
                  <img src={projeto.image} alt={projeto.titulo} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute top-6 left-6 flex gap-2">
                     <div className="bg-black/60 backdrop-blur-xl border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">{projeto.categoria}</div>
                     {isAdmin && <div className="bg-red-500/20 backdrop-blur-xl border border-red-500/30 text-red-500 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1"><Settings size={10}/> Admin</div>}
                  </div>
                  <div className="absolute bottom-6 right-6 bg-cyan-500 text-black text-[10px] font-black px-3 py-1.5 rounded-full uppercase shadow-lg">{projeto.status}</div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex gap-3 mb-4">
                    {projeto.tags.slice(0, 3).map(tag => (<span key={tag} className="text-[11px] text-cyan-500/70 font-mono">#{tag}</span>))}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                    {projeto.titulo}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">{projeto.descricao}</p>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 group-hover:text-white flex items-center gap-2">
                      {isAdmin ? 'Editar Projeto' : 'Ver Detalhes'} <div className="h-[1px] w-8 bg-white/10 group-hover:bg-cyan-500/30"></div>
                    </span>
                    <Info className="w-4 h-4 text-gray-700 group-hover:text-cyan-500 tech-icon-hover" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* --- FOOTER --- */}
        <footer id="contato" className="py-24 px-6 border-t border-white/5 bg-[#080808]/80 backdrop-blur-sm scroll-mt-20">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="relative mb-12">
              <div className="absolute -inset-12 bg-cyan-500/10 rounded-full blur-3xl opacity-50"></div>
              <div className="flex flex-col items-center relative z-10 group cursor-default">
                 <span className="font-black text-5xl md:text-6xl tracking-tighter text-white uppercase leading-none group-hover:text-cyan-400 transition-colors duration-500">INFOTECH</span>
                 <span className="text-xs font-bold text-cyan-500 tracking-[0.5em] uppercase leading-none mt-3">Soluções em TI</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-12 text-white">Transformando o futuro hoje.</h2>
            <button className="px-10 py-5 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-full hover:bg-cyan-400 hover:scale-110 transition-all shadow-2xl shadow-cyan-500/20 mb-20">
              Solicitar Orçamento
            </button>
            {!isAdmin && (
              <button onClick={() => setShowLoginPrompt(true)} className="mb-12 text-gray-800 hover:text-cyan-500/50 transition-colors flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] tech-icon-hover">
                <Lock className="w-3 h-3" /> Acesso Restrito
              </button>
            )}
            <div className="pt-12 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-start gap-1">
                 <span className="font-black text-xl tracking-tighter text-white uppercase leading-none">InfoTech</span>
                 <span className="text-[10px] font-bold text-cyan-500 tracking-[0.3em] uppercase leading-none">Soluções em TI</span>
              </div>
              <p className="text-gray-600 text-[10px] tracking-widest uppercase font-bold">© 2024 InfoTech - Admin Restricted Mode</p>
            </div>
          </div>
        </footer>
      </div>

      {/* --- MODAL DE DETALHES E EDIÇÃO --- */}
      {selectedProject && editProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-300">
            
            {/* Esquerda: Visualizador de Mídia */}
            <div className="relative w-full md:w-1/2 bg-black flex items-center justify-center group/galeria overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
               {editProject.prints && editProject.prints.length > 0 ? (
                 <>
                   <img src={editProject.prints[currentPrintIndex]} alt="Preview" className="w-full h-full object-contain p-4" />
                   {editProject.prints.length > 1 && (
                     <>
                        <button onClick={() => setCurrentPrintIndex(prev => (prev - 1 + editProject.prints.length) % editProject.prints.length)} className="absolute left-6 p-3 rounded-full bg-black/50 text-white border border-white/10 opacity-0 group-hover/galeria:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black tech-icon-hover"><ChevronLeft/></button>
                        <button onClick={() => setCurrentPrintIndex(prev => (prev + 1) % editProject.prints.length)} className="absolute right-6 p-3 rounded-full bg-black/50 text-white border border-white/10 opacity-0 group-hover/galeria:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black tech-icon-hover"><ChevronRight/></button>
                        <div className="absolute bottom-6 flex gap-2">
                           {editProject.prints.map((_, i) => (
                             <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentPrintIndex ? 'w-8 bg-cyan-500' : 'w-2 bg-white/20'}`}></div>
                           ))}
                        </div>
                     </>
                   )}
                   {isAdmin && (
                      <button 
                        onClick={() => removePrint(currentPrintIndex, 'edit')}
                        className="absolute top-6 right-6 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                        title="Remover esta imagem"
                      >
                        <Trash2 size={16}/>
                      </button>
                   )}
                 </>
               ) : (
                 <div className="flex flex-col items-center text-gray-600">
                    <ImageIcon size={48} className="mb-4 opacity-20"/>
                    <p className="text-sm font-bold uppercase tracking-widest">Sem imagens extras</p>
                 </div>
               )}
            </div>

            {/* Direita: Conteúdo / Formulário */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col bg-[#0d0d0d]">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <div className="flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1 rounded-full border border-red-500/20 text-[10px] font-black uppercase">
                      <Settings size={12}/> Modo Editor
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">{editProject.categoria}</span>
                  )}
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-500 hover:text-white tech-icon-hover"><X/></button>
              </div>

              {isAdmin ? (
                <div className="space-y-6">
                  {/* Edição de Capa */}
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest block mb-3">Imagem de Capa (Card)</label>
                    <div className="flex items-center gap-4">
                      <img src={editProject.image} className="w-20 h-20 rounded-lg object-cover border border-white/10" alt="Capa" />
                      <label className="flex-1 cursor-pointer group/upload">
                        <div className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-dashed border-white/20 rounded-xl group-hover/upload:border-cyan-500/50 transition-all">
                          <Upload size={16} className="text-gray-500 group-hover/upload:text-cyan-500" />
                          <span className="text-xs font-bold text-gray-400 group-hover/upload:text-white">Trocar Capa</span>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'edit', false)} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Título do Projeto</label>
                    <input type="text" value={editProject.titulo} onChange={e => setEditProject({...editProject, titulo: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xl font-bold text-white focus:border-cyan-500 outline-none transition-colors" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Categoria</label>
                      <select value={editProject.categoria} onChange={e => setEditProject({...editProject, categoria: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-colors">
                        <option>Gestão</option>
                        <option>Comércio</option>
                        <option>Imobiliário</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Status</label>
                      <input type="text" value={editProject.status} onChange={e => setEditProject({...editProject, status: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-colors" />
                    </div>
                  </div>

                  {/* Gerenciar Carrossel (Prints) */}
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-3">Carrossel de Prints (Fotos Internas)</label>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {editProject.prints.map((img, i) => (
                        <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group/img">
                           <img src={img} className="w-full h-full object-cover" alt={`Print ${i}`} />
                           <button onClick={() => removePrint(i, 'edit')} className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                        </div>
                      ))}
                      <label className="aspect-video rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors bg-white/5">
                        <Plus size={16} className="text-cyan-500 mb-1"/>
                        <span className="text-[8px] font-black uppercase">Add Foto</span>
                        <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'edit', true)} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Descrição Detalhada</label>
                    <textarea rows="4" value={editProject.descricaoLonga || editProject.descricao} onChange={e => setEditProject({...editProject, descricaoLonga: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 leading-relaxed outline-none resize-none focus:border-cyan-500 transition-colors" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <button onClick={() => handleDeleteProject(editProject.id)} className="flex items-center justify-center gap-2 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={18}/> Excluir
                    </button>
                    <button onClick={handleUpdateProject} className="flex items-center justify-center gap-2 py-4 bg-cyan-500 text-black rounded-xl font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                      <Save size={18}/> Salvar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-4xl font-black text-white mb-6 leading-tight">{selectedProject.titulo}</h2>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-cyan-500 font-bold border border-white/5 uppercase tracking-tighter">#{tag}</span>
                    ))}
                  </div>
                  <p className="text-gray-400 text-base leading-relaxed mb-10">
                    {selectedProject.descricaoLonga || selectedProject.descricao}
                  </p>
                  <div className="mt-auto pt-8 border-t border-white/5">
                    <button 
                      onClick={() => handleVisitProject(selectedProject.url)}
                      className="w-full py-5 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/10"
                    >
                      Solicitar Orçamento <ExternalLink size={18} className="tech-icon-hover"/>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL LOGIN ADMIN --- */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
            <Lock className="text-cyan-500 w-8 h-8 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-white mb-2">Login Administrativo</h2>
            <form onSubmit={handleAdminLogin} className="flex flex-col gap-4 mt-6">
              <input type="password" autoFocus required placeholder="Senha de Acesso" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:border-cyan-500 outline-none transition-colors" />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowLoginPrompt(false)} className="flex-1 py-3 text-gray-500 font-bold text-sm">Cancelar</button>
                <button type="submit" className="flex-1 bg-cyan-500 text-black font-bold py-3 rounded-xl hover:bg-cyan-400 transition-all">Entrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL ADICIONAR PROJETO --- */}
      {isModalOpen && isAdmin && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-4xl relative my-10 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white p-2 tech-icon-hover"><X/></button>
            <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">Novo Projeto</h2>
            
            <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Título do Case</label>
                  <input type="text" required value={novoProjeto.titulo} onChange={e => setNovoProjeto({...novoProjeto, titulo: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-cyan-500 transition-colors" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Categoria</label>
                    <select value={novoProjeto.categoria} onChange={e => setNovoProjeto({...novoProjeto, categoria: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-cyan-500">
                      <option>Gestão</option>
                      <option>Comércio</option>
                      <option>Imobiliário</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Status</label>
                    <input type="text" required value={novoProjeto.status} onChange={e => setNovoProjeto({...novoProjeto, status: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-cyan-500" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Resumo do Card</label>
                  <textarea required rows="2" value={novoProjeto.descricao} onChange={e => setNovoProjeto({...novoProjeto, descricao: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none resize-none focus:border-cyan-500" />
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Descrição Completa</label>
                  <textarea rows="4" value={novoProjeto.descricaoLonga} onChange={e => setNovoProjeto({...novoProjeto, descricaoLonga: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none resize-none focus:border-cyan-500" />
                </div>
              </div>

              <div className="space-y-6">
                {/* Upload de Capa */}
                <div>
                  <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest block mb-2">Foto de Capa (Principal)</label>
                  <label className="block relative aspect-video rounded-2xl overflow-hidden border border-dashed border-white/20 cursor-pointer hover:border-cyan-500 transition-all bg-black group/capa">
                    {novoProjeto.image ? (
                      <img src={novoProjeto.image} className="w-full h-full object-cover opacity-60 group-hover/capa:opacity-40 transition-opacity" alt="Capa Preview" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                        <Camera size={32} className="mb-2" />
                        <span className="text-[10px] font-bold uppercase">Escolher Foto do Card</span>
                      </div>
                    )}
                    <input type="file" required={!novoProjeto.image} accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'novo', false)} />
                  </label>
                </div>

                {/* Upload de Carrossel */}
                <div>
                  <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest block mb-2">Galeria do Carrossel (Prints)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {novoProjeto.prints.map((img, i) => (
                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group/item">
                        <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                        <button type="button" onClick={() => removePrint(i, 'novo')} className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                      </div>
                    ))}
                    <label className="aspect-video rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 bg-white/5 transition-colors">
                      <Plus size={20} className="text-gray-500" />
                      <span className="text-[8px] font-black uppercase">Add Print</span>
                      <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'novo', true)} />
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full bg-cyan-500 text-black font-black uppercase tracking-widest py-6 rounded-2xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 mt-4">Publicar Projeto</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;