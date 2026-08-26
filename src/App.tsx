import { useState } from 'react'
import { ArrowUpRight, BookOpen, Box, Braces, Cpu, Disc3, FolderOpen, GraduationCap, Headphones, Radio, Sparkles, Terminal, Waves } from 'lucide-react'
import { Debris } from './components/debris/Debris'
import './App.css'

type Tab = 'tools' | 'files' | 'library'
type Row = [string, string, string, typeof Waves, string?]

const D: Record<Tab, Row[]> = {
  tools: [
    ['Lumen Engine','Аудіореактивний AV-інструмент','https://tools.mandrock.me/lumen/',Sparkles,'LIVE'],
    ['EarForge','Тренажер музичного слуху','https://tools.mandrock.me/earforge/',Headphones],
    ['Sonargale','Phone-first AV-іграшка','https://tools.mandrock.me/sonargale/',Waves,'COLLAB'],
    ['Sampler','Семплер із синхронізацією','https://tools.mandrock.me/sampler/',Radio],
    ['Flok','Спільний live-coding','https://flok.mandrock.me',Braces,'LIVE'],
    ['touchviz','Touch-first GLSL-візуал','https://tools.mandrock.me/touchviz/',Radio],
    ['Hydra Track','Живий візуал для треку','https://tools.mandrock.me/hydra-track/',Disc3],
    ['Neon Moon','Інтерактивний музичний світ','/neon-moon/',Sparkles],
    ['Hand Chord','Акорди у браузері','https://tools.mandrock.me/hand-chord/',Headphones],
    ['Shove Replay','Повтор і розбір сесій','https://tools.mandrock.me/shove-replay/',Radio],
    ['AV Lab','Аудіовізуальні експерименти','https://tools.mandrock.me/av/',Waves],
    ['Music Hub','Релізи, каталоги, пайплайни','/music-hub/',Disc3,'AUTH'],
    ['Orchat','Чат-інструмент для закритих робочих сесій','https://tools.mandrock.me/orchat/',Terminal,'AUTH'],
    ['Filters','Аудіофільтри й пресети для збережених сетапів','https://tools.mandrock.me/filters/',Radio,'AUTH'],
    ['Day','Персональний day-dashboard','https://tools.mandrock.me/day/',Sparkles,'AUTH'],
    ['Hetzner','Серверна панель','https://tools.mandrock.me/hetzner/',Terminal,'AUTH'],
    ['Backlog','Живий трекер: що зараз робиться, готове або закрите','/backlog',Sparkles,'LIVE'],
    ['Tap','Мінімальний touch-інструмент для швидкого сигналу','/tap/',Radio],
    ['ESP32 builder','Зібрати firmware для плати без локального тулчейну','https://files.mandrock.me/esp32/',Cpu],
  ],
  files: [
    ['Bitwig','Методички, патчі, плагіни й внутрішня логіка Bitwig','https://files.mandrock.me/bitwig/',Radio],
    ['Jam','Набори для синтів, заліза й live-джему','https://files.mandrock.me/jam/',Radio],
    ['Visuals','Шейдери, генеративні скетчі й вихідні матеріали','https://files.mandrock.me/visuals/',Sparkles],
    ['Lessons','Навчальні матеріали, які можна одразу розібрати руками','https://files.mandrock.me/lessons/',BookOpen],
    ['Cheatsheets','Шпаргалки й хоткеї, що повертають швидкість','https://files.mandrock.me/cheatsheets/',BookOpen],
    ['Skills','Готові skill-файли для підхоплення в роботу','https://files.mandrock.me/skills/',Braces],
    ['STL','Моделі для перегляду, редагування й 3D-друку','https://files.mandrock.me/stl/',Box],
    ['G-code','Перевірені готові файли для друку','https://files.mandrock.me/gcode/',Braces],
    ['VR Lab','Архів VR-прототипів і сцен','https://files.mandrock.me/vr/',Box],
    ['VR Cloud','3D cloud та Craft-індекс','https://files.mandrock.me/vrcloud/',FolderOpen],
    ['CV','Коротко про досвід і напрямки роботи','https://files.mandrock.me/cv/',FolderOpen],
  ],
  library: [
    ['References','PDF і візуальні референси для наступного рішення','https://files.mandrock.me/references/',BookOpen],
    ['Speedcubing','F2L, OLL і PLL — структурований довідник тренувань','/speedcubing/',Box],
    ['GLSL','SDF, fbm, палітри й пастки для швидкого шейдерного старту','https://files.mandrock.me/visuals/glsl.html',Braces],
    ['Hydra + Strudel','Live-coding шпаргалки для негайного джему','https://files.mandrock.me/jam/flok/',Waves],
    ['Mandrock KB','Проєкти, нотатки й знахідки в одному місці','https://files.mandrock.me/kb/',BookOpen],
    ['Atlas','Timeline мислення й зв’язків','https://files.mandrock.me/atlas/',Sparkles,'AUTH'],
    ['Security Feeds','Сигнали безпеки без інформаційної каші','https://files.mandrock.me/security/',Cpu,'AUTH'],
    ['KB Library','Приватна бібліотека для довгої роботи','https://files.mandrock.me/kb-lib/',BookOpen,'AUTH'],
  ],
}

const articles: Row[] = [
  ['Debloat API: desk','Пре‑текст: коли робоча машина обростає зайвим — зібрати легкий, повторюваний стек.','/tools/debloat-api-desk/',Terminal],
  ['Debloat API: home','Пре‑текст: як зробити домашній вузол тихим, зрозумілим і придатним для підтримки.','/tools/debloat-api-home/',Terminal],
  ['Debloat API: media','Пре‑текст: як відокремити медіавузол, контролювати шум і не зламати основну систему.','/tools/debloat-api-media/',Terminal],
  ['Cobalt tools','Пре‑текст: що поставити навколо медіа‑задач, щоб не збирати один і той самий набір щоразу.','/tools/cobalt-tools/',Braces],
  ['Claude memory system','Пре‑текст: коли контекст починає губитися — як перетворити памʼять агента на архітектуру.','/claude/claude-memory-system/',Cpu],
  ['Service block preferences','Пре‑текст: як не перетворити сервісні блоки на безформний набір перемикачів.','/claude/service-block-preferences/',Cpu],
  ['Lock/public pipeline','Пре‑текст: як розділити публічне й закрите без двох паралельних реальностей.','/claude/lock-public-pipeline/',Cpu],
  ['Shove replay','Пре‑текст: як повернути агентну сесію до стану, який можна повторити й розібрати.','/claude/shove-replay/',Cpu],
  ['Audio downloader','Пре‑текст: як зібрати аудіо через CLI без ручного бігання між сервісами.','/music/audio-downloader/',Disc3],
  ['Cables.gl','Пре‑текст: як пройти від нодового графа до робочого експорту, а не лишитися в демці.','/lessons/cables-gl/',Waves],
]

function Cards({ rows, kind = 'OPEN', pretext = false }: { rows: Row[], kind?: string, pretext?: boolean }) {
  return <div className="grid">{rows.map((x,i)=>{const I=x[3], external=x[2].startsWith('http');return <a className="node" href={x[2]} key={x[0]} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}><span className="num">{String(i+1).padStart(2,'0')}</span><I size={22}/><div>{pretext&&<span className="pretext-label">PRE‑TEXT / WHY READ</span>}<strong>{x[0]}</strong><p>{x[1]}</p><span className="node-pitch">{kind} →</span></div>{x[4]&&<b>{x[4]}</b>}<ArrowUpRight className="arrow" size={18}/></a>})}</div>
}

export default function App(){
  const [tab,setTab]=useState<Tab>('tools')
  return <div className="site" id="top">
    <header><a className="brand" href="#top"><i/>mandrock0</a><nav><a href="#catalog">INDEX</a><a href="#music-hub">MUSIC HUB</a><a href="#articles">ARTICLES</a><a href="#artists">ARTISTS</a></nav></header>
    <main>
      <section className="hero"><Debris seed="hero-2026" name="signal" count={72} alive/><div className="eyebrow"><span>PERSONAL NETWORK</span><span>KYIV ↔ WEB</span><span className="online">ONLINE</span></div><h1>СИСТЕМИ <em>/</em><br/>ОБʼЄКТИ <em>/</em><br/>СИГНАЛ</h1><div className="herofoot"><p>Роблю браузерні інструменти, 3D‑обʼєкти, музику, джеми й знання, з яких збирається нормальний робочий процес.</p><span>50.4501° N<br/>30.5234° E</span></div></section>
      <section className="manifest"><Debris seed="manifest" name="system" count={48} alive/><div className="sectionhead"><span>00 / PERSONAL OPERATING SYSTEM</span><span>KYIV NODE · ONLINE</span></div><div className="manifest-intro"><h2>НЕ ПОРТФОЛІО.<br/>ЖИВИЙ ЦИФРОВИЙ ВУЗОЛ.</h2><p>Self-hosted creative platform між локальним середовищем і вебом: лабораторія програмування, музична студія, 3D‑майстерня, джеми, база знань і публічний шар в одному інтерфейсі.</p></div><div className="layers"><div><span>01 / CREATION</span><b>Music · 3D · Visuals · Jams</b><p>Сигнал входить через звук, touch, MIDI, сенсори й події — виходить інструментом, треком, обʼєктом або живим візуалом.</p></div><div><span>02 / KNOWLEDGE</span><b>Articles · Course · Refs</b><p>Кристалізовані нотатки, практичні методички, технічні статті й довідники, які можна застосувати.</p></div><div><span>03 / INFRASTRUCTURE</span><b>Tools · Files · Auth</b><p>tools.mandrock.me запускає речі, files.mandrock.me зберігає матеріали, а приватний шар лишається приватним.</p></div></div><div className="access-line"><span><i className="public"/>PUBLIC</span><span><i className="auth"/>INVITE</span><span><i className="private"/>PRIVATE</span></div></section>
      <section className="surface-map"><Debris seed="surface-map" name="routing" count={42} alive/><div className="sectionhead"><span>00.1 / WHERE THINGS LIVE</span><span>NO HIDDEN EXITS</span></div><div className="surface-links"><a href="https://mandrock.me"><span>PUBLIC INDEX</span><b>mandrock.me</b><p>Проєкти, статті, контекст і вхід у всю систему.</p><i>OPEN INDEX ↗</i></a><a href="https://tools.mandrock.me"><span>RUNNABLE TOOLS</span><b>tools.mandrock.me</b><p>Інструменти, які можна відкрити, покрутити й застосувати.</p><i>RUN A TOOL ↗</i></a><a href="https://files.mandrock.me"><span>FILES / MATERIALS</span><b>files.mandrock.me</b><p>Методички, моделі, файли, скетчі й архіви для роботи.</p><i>GET MATERIALS ↗</i></a></div></section>
      <section className="featured"><Debris seed="backlog" name="queue" count={44} alive/><a href="/backlog"><span>LIVE SYSTEM / NO LOGIN</span><h2>BACKLOG</h2><p>Що роблю зараз, що вже готово і що померло дорогою.</p><ArrowUpRight/></a></section>
      <section className="catalog" id="catalog"><Debris seed="catalog" name="index" count={54} alive/><div className="sectionhead"><span>01 / NETWORK INDEX</span><span>{D[tab].length} NODES</span></div><div className="catalog-copy"><b>{tab === 'tools' ? 'TOOLS.MANDROCK.ME' : tab === 'files' ? 'FILES.MANDROCK.ME' : 'LIBRARY'}</b><p>{tab === 'tools' ? 'Запускай, слухай, збирай, перевіряй: тут кожен вузол щось робить.' : tab === 'files' ? 'Забирай матеріали, моделі й методички: тут кожен вузол щось залишає тобі.' : 'Довідники й референси, що економлять повторення вже розвʼязаних задач.'}</p></div><div className="tabs" role="tablist">{(['tools','files','library'] as Tab[]).map(k=><button role="tab" aria-selected={tab===k} onClick={()=>setTab(k)} key={k}>{k.toUpperCase()} <small>{D[k].length}</small></button>)}</div><Cards rows={D[tab]} kind={tab === 'tools' ? 'RUN TOOL' : tab === 'files' ? 'GET MATERIAL' : 'OPEN LIBRARY'}/></section>
      <section className="music-hub" id="music-hub"><Debris seed="music-hub" name="pipeline" count={62} alive/><div className="sectionhead"><span>02 / INVITE-ONLY MUSIC HUB</span><span>PIPELINE, NOT A VIBE</span></div><div className="music-hub-copy"><Disc3/><div><h2>З НІХУЯ —<br/>У ПРОДЮСЕРА.</h2><p>Закритий хаб для тих, кому потрібен не ще один набір туторіалів, а готовий пайплайн: написати, зібрати, довести трек до релізу та відправити його в дистрибуцію.</p></div><ol><li>Ідея та сесія</li><li>Аранжування і звук</li><li>Обкладинка й метадані</li><li>Дистрибуція, каталог, роялті</li></ol></div><a className="hub-action" href="/music-hub/">REQUEST INVITE / MUSIC HUB →</a></section>
      <section className="articles" id="articles"><Debris seed="articles" name="read" count={50}/><div className="sectionhead"><span>03 / ARTICLES WITH A PRE-TEXT</span><span>{articles.length} TEXTS</span></div><p className="pretext">Кожна стаття починається з короткого пре‑тексту: для кого вона, яку конкретну проблему розбирає і що стане простішим після читання.</p><div className="article-groups"><div><h3>TOOLS / SYSTEMS</h3><Cards rows={articles.slice(0,4)} kind="READ ARTICLE" pretext/></div><div><h3>CLAUDE / AGENTS</h3><Cards rows={articles.slice(4,8)} kind="READ ARTICLE" pretext/></div><div><h3>MUSIC / LEARNING</h3><Cards rows={articles.slice(8)} kind="READ ARTICLE" pretext/></div></div></section>
      <section className="bitwig-course"><Debris seed="bitwig-course" name="method" count={58} alive/><div className="sectionhead"><span>04 / TEXT COURSE + PRACTICE</span><span>BITWIG METHOD</span></div><div className="course-copy"><GraduationCap/><div><h2>BITWIG: НЕ ДИВИТИСЯ. РОБИТИ.</h2><p>Текстова методичка з практичними: коротка теорія, конкретна дія в проєкті, перевірка результату й наступний крок. Не «дивись як я клацаю», а збери власний трековий процес руками.</p></div><a className="hub-action" href="https://files.mandrock.me/bitwig/">OPEN BITWIG MATERIALS ↗</a></div></section>
      <section className="worlds" id="worlds"><Debris seed="tracks" name="practice" count={56} alive/><div className="sectionhead"><span>05 / OTHER PRACTICES</span><span>NOT JUST SOFTWARE</span></div><div className="worldgrid"><a href="/music-hub/"><Disc3/><span>MUSIC HUB · INVITE</span><h2>МУЗИЧНИЙ ПАЙПЛАЙН</h2><p>Від чернетки до дистрибуції: релізи, каталог, touchviz і Hydra albums.</p></a><a href="/claude/"><Cpu/><span>CLAUDE / COWORK / CODE</span><h2>АГЕНТНІ СИСТЕМИ</h2><p>Памʼять, скіли, агенти, контекст, prompting і робочі пайплайни.</p></a><a href="/speedcubing/"><Box/><span>F2L · OLL · PLL</span><h2>SPEEDCUBING</h2><p>Метод Фрідріх, алгоритми, прогрес і довідник для тренувань.</p></a><a href="https://files.mandrock.me/jam/"><Radio/><span>SYNTHS / LIVE / DIY</span><h2>ДЖЕМИ Й ФІЗИЧНІ РЕЧІ</h2><p>Bitwig, синти, live-coding, ESP32, 3D‑друк, VR і генеративний візуал.</p></a></div></section>
      <section className="artists" id="artists"><Debris seed="artists" name="audio" count={48} alive/><div className="sectionhead"><span>06 / ARTISTS &amp; ALIASES</span><span>ACTIVE · ARCHIVE · RESERVED</span></div><div className="artistgrid"><a className="artist zero" href="/artists/mandrock0/"><span>ACTIVE ALIAS / PRODUCER / LIVECODER</span><h2>mandrock0</h2><p>Електроніка, live-coding, інструменти, що реагують.</p><ArrowUpRight/></a><a className="artist payalnyk" href="/artists/payalnyk/"><span>PRODUCED ARTIST / 10 TRACKS</span><h2>PAYALNYK</h2><p>Альбом «ССЧ». Окремий профіль і окремий світ.</p><ArrowUpRight/></a></div><div className="alias-head"><span>МОЇ ІМЕНА</span><span>ACTIVE · ARCHIVE · RESERVED</span></div><div className="aliases"><a href="/artists/mandrock0/"><b>mandrock0</b><span>active · electronic</span></a><div><b>exDJGAZBENZIN</b><span>archive · raves</span></div>{['ПОП-ВОКАЛ','РЕЙВ','ДЖЕМИ','КОЛАБИ','ЕМБІЄНТ','ЛАЙВ-КОДИНГ'].map((name,i)=><div className="reserved" key={name}><b>ALIAS {String(i+1).padStart(2,'0')}</b><span>{name} · домен закріплений</span></div>)}</div></section>
    </main>
    <footer><a className="homeglitch" href="#top" data-text="ВЕРНУТИСЯ НА ГОЛОВНУ)"><span>ВЕРНУТИСЯ НА ГОЛОВНУ)</span></a><div className="footmeta"><span>MANDROCK.ME © 2026</span><span>TOOLS · FILES · REFS</span><span>AMBIENT: FULL</span></div></footer>
  </div>
}
