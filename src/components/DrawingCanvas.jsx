import React, { useState, useRef, useEffect } from 'react';
import { HIRAGANA_LESSON_ITEMS } from '../data/hiraganaStrokes';
import { speech } from '../utils/speech';
import { soundFx } from '../utils/sound';
import confetti from 'canvas-confetti';
import { sampleStroke, matchesGuidedStroke } from '../utils/strokes';
import { WRITING_WORKSHEETS } from '../data/writingWorksheets';
import { Play, RotateCcw, Undo2, Check, Star, Volume2, Award, ArrowLeft, ArrowRight, PenTool } from 'lucide-react';

export default function DrawingCanvas({ showRomaji, audioEnabled, initialWorksheetId = 'all' }) {
  const [worksheetId, setWorksheetId] = useState(initialWorksheetId);
  const [selectedCharId, setSelectedCharId] = useState(() =>
    WRITING_WORKSHEETS.find(sheet => sheet.id === initialWorksheetId)?.characters[0] || HIRAGANA_LESSON_ITEMS[0].id);
  const [activeStage, setActiveStage] = useState('demo'); // 'demo' | 'guided' | 'freehand'
  const [activeStrokeIndex, setActiveStrokeIndex] = useState(0);
  const [completedStrokes, setCompletedStrokes] = useState([]); // user drawn strokes
  const [demoProgress, setDemoProgress] = useState(0); // for animating demo
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [strokeFeedback, setStrokeFeedback] = useState('');
  const [showOverlayInFreehand, setShowOverlayInFreehand] = useState(false);
  const [activeFilter, setActiveFilter] = useState(initialWorksheetId === 'all' ? 'all' : 'basic');

  const canvasRef = useRef(null);
  const demoTimerRef = useRef(null);
  const drawingRef = useRef(false);
  const lineRef = useRef([]);

  const activeChar = HIRAGANA_LESSON_ITEMS.find(c => c.id === selectedCharId) || HIRAGANA_LESSON_ITEMS[0];

  // Filter items
  const filteredChars = HIRAGANA_LESSON_ITEMS.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'special') return ['っ', 'ん'].includes(item.kana);
    if (activeFilter === 'basic') return item.category === 'basic' && (worksheetId === 'all' || item.worksheetId === worksheetId);
    return item.category === activeFilter;
  });

  const moveCharacter = (offset) => {
    if (filteredChars.length === 0) return;
    setSelectedCharId(currentId => {
      const currentIndex = filteredChars.findIndex(item => item.id === currentId);
      return filteredChars[(currentIndex + offset + filteredChars.length) % filteredChars.length].id;
    });
  };

  useEffect(() => {
    if (!filteredChars.some(item => item.id === selectedCharId)) setSelectedCharId(filteredChars[0].id);
  }, [activeFilter, worksheetId]);

  // Reset drawing states when character or stage changes
  useEffect(() => {
    resetCanvas();
    if (activeStage === 'demo') {
      playDemo();
    }
    return () => clearInterval(demoTimerRef.current);
  }, [selectedCharId, activeStage]);

  const resetCanvas = () => {
    setCompletedStrokes([]);
    setActiveStrokeIndex(0);
    lineRef.current = [];
    drawingRef.current = false;
    setStrokeFeedback('');
    setShowOverlayInFreehand(false);
    clearCanvas();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Play audio pronunciation of the current character
  const playAudio = (char) => {
    if (audioEnabled) {
      speech.speak(char.kana);
    }
  };

  // Stage 1: Play animated demo of strokes
  const playDemo = () => {
    clearInterval(demoTimerRef.current);
    setIsDemoPlaying(true);
    setDemoProgress(1);
    playAudio(activeChar);

    const totalStrokes = activeChar.strokes.length;
    let currentStroke = 1;

    demoTimerRef.current = setInterval(() => {
      if (currentStroke >= totalStrokes) {
        clearInterval(demoTimerRef.current);
        setIsDemoPlaying(false);
        return;
      }
      currentStroke += 1;
      setDemoProgress(currentStroke);
    }, 700);
  };

  // Helper to get canvas coordinates from mouse or touch event
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = 200 / rect.width;
    const scaleY = 200 / rect.height;

    let clientX, clientY;
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // Start Drawing
  const startDrawing = (e) => {
    e.preventDefault();
    if (activeStage === 'demo' || (activeStage === 'guided' && activeStrokeIndex >= activeChar.strokes.length)) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const coords = getCanvasCoords(e);
    drawingRef.current = true;
    lineRef.current = [coords];
    setShowOverlayInFreehand(false);
    setStrokeFeedback('');
  };

  // Draw in Progress
  const drawMove = (e) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    lineRef.current.push(coords);
    redrawCanvas([...completedStrokes, lineRef.current]);
  };

  // Finish Stroke
  const stopDrawing = (e) => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lineRef.current.push(getCanvasCoords(e));
    const currentLine = lineRef.current;
    lineRef.current = [];
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);

    if (currentLine.length < 3) {
      redrawCanvas(completedStrokes);
      return;
    }

    if (activeStage === 'guided') {
      validateGuidedStroke(currentLine);
    } else if (activeStage === 'freehand') {
      setCompletedStrokes(prev => [...prev, currentLine]);
    }
  };

  // Validate user's stroke in Guided Tracing mode
  const validateGuidedStroke = (userStroke) => {
    const targetStroke = activeChar.strokes[activeStrokeIndex];
    if (!targetStroke) return;
    if (matchesGuidedStroke(userStroke, sampleStroke(targetStroke))) {
      // Stroke Accepted!
      soundFx.strokeDone();
      advanceGuidedStroke(userStroke);
    } else {
      // Stroke did not match direction or position
      soundFx.incorrect();
      // redraw without this failing stroke
      redrawCanvas(completedStrokes);
      setStrokeFeedback('Try again: start at the numbered dot, follow the full highlighted path, and finish at its end.');
    }
  };

  const advanceGuidedStroke = (userStroke) => {
    const nextStrokes = [...completedStrokes, userStroke];
    setCompletedStrokes(nextStrokes);
    const nextIdx = activeStrokeIndex + 1;
    setActiveStrokeIndex(nextIdx);

    if (nextIdx >= activeChar.strokes.length) {
      // Completed character!
      soundFx.correct();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        disableForReducedMotion: true
      });
    }
  };

  // Redraw all completed strokes onto HTML5 Canvas
  const redrawCanvas = (strokes) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokes.forEach((stroke, idx) => {
      if (!stroke || stroke.length === 0) return;

      // Color coding: primary ink color
      ctx.strokeStyle = activeStage === 'freehand' ? '#1e293b' : '#e11d48';
      ctx.lineWidth = 5;

      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });
  };

  // Evaluate Freehand Mode Recall
  const evaluateFreehand = () => {
    if (completedStrokes.length === 0) return;

    setShowOverlayInFreehand(true);
  };

  // Undo Last Stroke
  const undoLastStroke = () => {
    if (completedStrokes.length === 0) return;
    const updated = completedStrokes.slice(0, -1);
    setCompletedStrokes(updated);
    setShowOverlayInFreehand(false);
    setStrokeFeedback('');
    if (activeStage === 'guided') {
      setActiveStrokeIndex(Math.max(0, activeStrokeIndex - 1));
    }
    redrawCanvas(updated);
  };

  const isGuidedFinished = activeStage === 'guided' && activeStrokeIndex >= activeChar.strokes.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-torii-100 text-torii-700">
              {activeChar.lesson}
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              {activeChar.subgroup}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Dynamic Hiragana Tracing</span>
            <span className="font-jp text-torii-600 font-black whitespace-nowrap shrink-0">{activeChar.kana}</span>
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">{activeChar.meaning}</p>
        </div>

        {/* 3-Stage Mastery Switcher */}
        <div className="grid grid-cols-3 w-full md:w-auto bg-slate-200/80 p-1 rounded-2xl gap-1 shadow-inner">
          <button
            onClick={() => setActiveStage('demo')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeStage === 'demo'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-blue-500" />
            <span>1. Demo</span>
          </button>

          <button
            onClick={() => setActiveStage('guided')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeStage === 'guided'
                ? 'bg-white text-torii-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 text-torii-500" />
            <span>2. Trace</span>
          </button>

          <button
            onClick={() => setActiveStage('freehand')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeStage === 'freehand'
                ? 'bg-white text-matcha-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-matcha-500" />
            <span>3. Recall</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Character Carousel on Left, Canvas Workspace in Center/Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">

        {/* Left Character Selector Drawer (4 columns on lg) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col">

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 text-xs font-bold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({HIRAGANA_LESSON_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveFilter('basic')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${activeFilter === 'basic' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Basic kana (46)
            </button>
            <button
              onClick={() => setActiveFilter('diacritics')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                activeFilter === 'diacritics'
                  ? 'bg-torii-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Diacritics (1.2)
            </button>
            <button
              onClick={() => setActiveFilter('digraphs')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                activeFilter === 'digraphs'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Digraphs (1.3)
            </button>
            <button
              onClick={() => setActiveFilter('special')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                activeFilter === 'special'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              っ & ん
            </button>
          </div>

          {activeFilter === 'basic' && <div className="mb-4">
            <label htmlFor="writing-sheet" className="block text-xs font-bold text-slate-600 mb-2">Writing worksheet</label>
            <select id="writing-sheet" value={worksheetId} onChange={event => setWorksheetId(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white p-2 text-sm">
              <option value="all">All 46 basic characters</option>
              {WRITING_WORKSHEETS.map(sheet => <option key={sheet.id} value={sheet.id}>Writing #{sheet.number}: {sheet.characters.join(' ')}</option>)}
            </select>
          </div>}

          {/* Character Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 auto-rows-[minmax(80px,auto)] gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredChars.map((item) => {
              const isSelected = item.id === selectedCharId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedCharId(item.id)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-b from-torii-500 to-rose-600 text-white shadow-md shadow-rose-200 scale-102 ring-2 ring-rose-400'
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700'
                  }`}
                >
                  <span className="font-jp text-2xl font-black">{item.kana}</span>
                  {showRomaji && (
                    <span className={`text-[11px] font-bold mt-1 ${isSelected ? 'text-white/90' : 'text-slate-400'}`}>
                      {item.romaji}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Example Vocabulary Card from Slide Deck */}
          <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">{activeChar.category === 'basic' ? 'Worksheet model' : 'Lecture Vocabulary'}</span>
              <button
                disabled={!audioEnabled}
                onClick={() => playAudio({ kana: activeChar.example.split(' ')[0] })}
                className="text-amber-700 hover:text-amber-900"
                title="Pronounce Word"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="font-jp text-lg font-bold text-slate-900 mt-1">
              {showRomaji ? activeChar.example : activeChar.example.split(' (')[0]}
            </div>
          </div>
          {activeChar.source && <p className="mt-3 text-xs text-slate-500">Source: {activeChar.source} · page {activeChar.page}. Practice the model, then repeat from memory as in the blank worksheet cells.</p>}
        </div>

        {/* Right Canvas Area (8 columns on lg) */}
        <div className="lg:col-span-8 flex flex-col items-center bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative">

          {/* Header Controls */}
          <div className="w-full flex flex-wrap gap-3 items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                disabled={!audioEnabled}
                onClick={() => playAudio(activeChar)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <Volume2 className="w-4 h-4 text-torii-600" />
                <span>Hear Sound</span>
              </button>
              {showRomaji && (
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-fuji-50 text-fuji-700 border border-fuji-100">
                  {activeChar.romaji}
                </span>
              )}
            </div>

            {/* Stage-specific guidance prompt */}
            <div className="text-xs font-bold text-slate-500">
              {activeStage === 'demo' && 'Step 1: Watch stroke path & direction'}
              {activeStage === 'guided' && `Step 2: Stroke ${Math.min(activeStrokeIndex + 1, activeChar.strokes.length)} of ${activeChar.strokes.length}`}
              {activeStage === 'freehand' && 'Step 3: Draw character completely from memory'}
            </div>
          </div>

          {/* THE DRAWING CANVAS CONTAINER (Traditional Kanji/Kana Grid) */}
          <div className="relative w-full max-w-[380px] aspect-square rounded-3xl border-2 border-slate-300 bg-white overflow-hidden shadow-inner flex items-center justify-center">

            {/* Traditional Practice Grid Background Guidelines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-rose-200/70 border-r border-dashed border-rose-300"></div>
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-rose-200/70 border-b border-dashed border-rose-300"></div>
              <div className="absolute inset-4 border border-dashed border-slate-200 rounded-2xl"></div>
            </div>

            {/* STAGE 1: DEMO SVG LAYER */}
            {activeStage === 'demo' && (
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Ghost Outline */}
                {activeChar.strokes.map((stroke, i) => (
                  <path
                    key={`demo-ghost-${i}`}
                    d={stroke.path}
                    transform={stroke.transform}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth={5 / stroke.scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {/* Animated active strokes */}
                {activeChar.strokes.slice(0, demoProgress).map((stroke, i) => (
                  <path
                    key={`demo-stroke-${selectedCharId}-${i}`}
                    d={stroke.path}
                    transform={stroke.transform}
                    pathLength="1"
                    className="animate-draw-stroke"
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth={5 / stroke.scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {/* Stroke number indicators */}
                {activeChar.strokes.map((stroke, i) => {
                  const pt = stroke.points ? stroke.points[0] : { x: 50, y: 50 };
                  const isRevealed = i < demoProgress;
                  return (
                    <g key={`demo-num-${i}`}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="9"
                        fill={isRevealed ? '#e11d48' : '#94a3b8'}
                      />
                      <text
                        x={pt.x}
                        y={pt.y + 3.5}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill="#ffffff"
                      >
                        {i + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}

            {/* STAGE 2: GUIDED TRACING GHOST & ACTIVE GUIDE LAYER */}
            {activeStage === 'guided' && (
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Target Ghost Outline */}
                {activeChar.strokes.map((stroke, i) => (
                  <path
                    key={`ghost-${i}`}
                    d={stroke.path}
                    transform={stroke.transform}
                    fill="none"
                    stroke={i < activeStrokeIndex ? '#10b981' : '#f1f5f9'}
                    strokeWidth={7 / stroke.scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {/* Active pulsating stroke guide */}
                {activeStrokeIndex < activeChar.strokes.length && (
                  <path
                    d={activeChar.strokes[activeStrokeIndex].path}
                    transform={activeChar.strokes[activeStrokeIndex].transform}
                    fill="none"
                    stroke="#fca5a5"
                    strokeWidth={7 / activeChar.strokes[activeStrokeIndex].scale}
                    className="animate-pulse"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Stroke numbers */}
                {activeChar.strokes.map((stroke, i) => {
                  const pt = stroke.points ? stroke.points[0] : { x: 50, y: 50 };
                  const isCurrent = i === activeStrokeIndex;
                  const isPast = i < activeStrokeIndex;
                  return (
                    <g key={`num-${i}`}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isCurrent ? "11" : "8"}
                        fill={isPast ? '#10b981' : isCurrent ? '#e11d48' : '#cbd5e1'}
                      />
                      <text
                        x={pt.x}
                        y={pt.y + (isCurrent ? 4 : 3)}
                        textAnchor="middle"
                        fontSize={isCurrent ? "11" : "8"}
                        fontWeight="bold"
                        fill="#ffffff"
                      >
                        {i + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}

            {/* STAGE 3: FREEHAND OVERLAY (When revealed after scoring) */}
            {activeStage === 'freehand' && showOverlayInFreehand && (
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
              >
                {activeChar.strokes.map((stroke, i) => (
                  <path
                    key={`freehand-reveal-${i}`}
                    d={stroke.path}
                    transform={stroke.transform}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth={5 / stroke.scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </svg>
            )}

            {/* INTERACTIVE HTML5 CANVAS FOR DRAWING */}
            <canvas
              ref={canvasRef}
              width={200}
              height={200}
              onPointerDown={startDrawing}
              onPointerMove={drawMove}
              onPointerUp={stopDrawing}
              onPointerCancel={() => { drawingRef.current = false; lineRef.current = []; redrawCanvas(completedStrokes); }}
              aria-label={`Drawing area for ${activeChar.kana}. Use touch, a pen, or a mouse. The demo is available without drawing.`}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
            />
          </div>

          {/* Guided Mode Stroke Direction Instruction */}
          {activeStage === 'guided' && activeStrokeIndex < activeChar.strokes.length && (
            <div className="mt-3 text-xs font-bold text-torii-700 bg-torii-50 border border-torii-100 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-torii-500 animate-ping"></span>
              <span>{activeChar.strokes[activeStrokeIndex].hint}</span>
            </div>
          )}

          {/* Guided Mode Completion Badge */}
          {isGuidedFinished && (
            <div className="mt-4 p-4 rounded-2xl bg-matcha-50 border border-matcha-200 text-center w-full max-w-md animate-fade-in">
              <div className="flex items-center justify-center gap-1 text-amber-500">
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <h3 className="font-extrabold text-matcha-900 text-sm mt-1">Excellent! Guided Trace Complete</h3>
              <p className="text-xs text-matcha-700 mt-0.5">Now advance to Stage 3 to test your freehand recall!</p>
              <button
                onClick={() => setActiveStage('freehand')}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-matcha-600 hover:bg-matcha-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Try Freehand Recall</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Freehand Evaluation Results Card */}
          {activeStage === 'freehand' && showOverlayInFreehand && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white w-full max-w-md text-center">
              <div className="font-bold text-amber-400">Compare your drawing with the green model</div>
              <p className="text-xs text-slate-300 mt-1">
                You drew {completedStrokes.length} strokes; the model uses {activeChar.strokes.length}. Check the shape, size and direction yourself, then try again.
              </p>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <div role="group" aria-label="Character navigation" className="grid grid-cols-2 gap-2 w-full sm:w-auto">
              <button type="button" onClick={() => moveCharacter(-1)}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold">
                <ArrowLeft className="w-4 h-4 shrink-0" /><span>Previous character</span>
              </button>
              <button type="button" onClick={() => moveCharacter(1)}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold">
                <span>Next character</span><ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
            {activeStage === 'demo' ? (
              <button
                onClick={playDemo}
                disabled={isDemoPlaying}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Replay Animation</span>
              </button>
            ) : (
              <>
                <button
                  onClick={undoLastStroke}
                  disabled={completedStrokes.length === 0}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors disabled:opacity-40"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>Undo</span>
                </button>

                <button
                  onClick={resetCanvas}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>

                {activeStage === 'freehand' && (
                  <button
                    onClick={evaluateFreehand}
                    disabled={completedStrokes.length === 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-matcha-500 to-emerald-600 hover:from-matcha-600 hover:to-emerald-700 text-white text-xs font-bold transition-all shadow-md disabled:opacity-40"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Compare with model</span>
                  </button>
                )}
              </>
            )}
          </div>

          {strokeFeedback && <p role="status" className="mt-4 text-sm text-rose-700">{strokeFeedback}</p>}
          <p className="mt-5 text-xs text-slate-500 text-center max-w-md">
            Stroke models adapted from <a className="underline" href="https://kanjivg.tagaini.net/" target="_blank" rel="noreferrer">KanjiVG</a>, © Ulrich Apel and contributors,
            {' '}<a className="underline" href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>. Scaled and combined for kana practice.
          </p>

        </div>

      </div>

    </div>
  );
}
