import { useEffect, useSyncExternalStore } from 'react'
import './App.css'

function subscribeToNavigation(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getCurrentLocation() {
  return window.location.hash
}

const projects = [
  {
    number: '01', category: '음악 · 공연', title: '학교 밴드부 버스킹', description: '밴드부에서 준비한 첫 공개 공연', style: 'website', image: `${import.meta.env.BASE_URL}busking-illustration.svg`,
    overview: '학교 밴드부의 일원으로 준비한 버스킹 공연입니다. 기타와 드럼을 다루는 밴드 멤버로서 여러 사람과 함께 음악을 만드는 경험을 했습니다.',
    goal: '좋아하는 악기들을 배우고 밴드에서 팀원들과 함께 음악하는 즐거움을 느끼는 것이 목표였습니다. 공개 공연을 통해 준비한 음악을 사람들과 나누고 싶었습니다.',
    process: ['밴드 구성원과 함께 연주할 곡을 정하고 연습했습니다.', '기타와 드럼 파트를 맡아서 반복 연습했습니다.', '버스킹 장소에서 처음으로 공개 공연을 했습니다.'],
    learning: '악기 실력을 키우는 것뿐 아니라 팀원들과 호흡을 맞추는 것의 중요성을 배웠습니다. 공개 공연 경험이 자신감을 키우는 데 도움이 되었습니다.',
  },
]

function ProjectArtwork({ project, className = '' }) {
  return (
    <div className={`project-art ${project.style} ${className}`} aria-hidden="true">
      <span className="project-number">{project.number}</span>
      {project.image ? <><img className="project-art-image" src={project.image} alt="" /><span className="project-art-note">창작 일러스트 · 실제 공연 사진이 아닙니다</span></> : null}
      {!project.image && project.style === 'website' && <div className="mini-browser"><div className="mini-toolbar"><i /><i /><i /></div><div className="mini-layout"><span>HELLO!</span><div /><p>My little corner<br />of the internet.</p></div></div>}
      {!project.image && project.style === 'idea' && <><div className="idea-circle" /><span className="idea-asterisk">✳</span><span className="idea-caption">WHAT IF?</span></>}
      {!project.image && project.style === 'creative' && <><div className="creative-shape shape-one" /><div className="creative-shape shape-two" /><span className="creative-caption">make<br /><em>something.</em></span></>}
    </div>
  )
}

function App() {
  const currentLocation = useSyncExternalStore(subscribeToNavigation, getCurrentLocation)
  const isPortfolioPage = currentLocation === '#/portfolio'
  const isAboutPage = currentLocation === '#/about' || currentLocation === '#about'
  const isProjectPage = currentLocation.startsWith('#/portfolio/')
  const selectedProject = isProjectPage ? projects.find((project) => currentLocation === `#/portfolio/${project.style}`) : undefined

  useEffect(() => {
    document.title = isProjectPage ? `${selectedProject?.title ?? '프로젝트를 찾을 수 없어요'} | 최호인 포트폴리오` : isPortfolioPage ? '포트폴리오 목록 | 최호인 포트폴리오' : isAboutPage ? '자기소개 | 최호인 포트폴리오' : '최호인 포트폴리오'

    if (isPortfolioPage || isAboutPage || isProjectPage) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById(isProjectPage ? 'project-title' : isPortfolioPage ? 'portfolio-title' : 'about-page-title')?.focus({ preventScroll: true })
    } else {
      const targetId = currentLocation.slice(1) || 'home'
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    }
  }, [currentLocation, isPortfolioPage, isAboutPage, isProjectPage, selectedProject])

  return (
    <>
      <a className="skip-link" href="#main" onClick={(event) => { event.preventDefault(); document.getElementById('main')?.focus(); document.getElementById('main')?.scrollIntoView({ block: 'start' }) }}>본문으로 바로가기</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#home" aria-label="최호인 포트폴리오 홈">
            <span className="brand-symbol" aria-hidden="true">✳</span> 최호인<span className="brand-dot">.</span>
          </a>
          <nav aria-label="주요 메뉴">
            <a href="#/about" aria-current={isAboutPage ? 'page' : undefined}>자기소개</a>
            <a href="#/portfolio" aria-current={isPortfolioPage || isProjectPage ? 'page' : undefined}>포트폴리오 <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {!isPortfolioPage && !isAboutPage && !isProjectPage && <>
        <section className="hero page-width" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> WELCOME TO 집 가고싶다'S PAGE</p>
            <h1 id="hero-title">안녕하세요,<br />집 가고싶은 학생입니다<span className="underlined">.</span></h1>
            <p className="hero-description">게임을 즐기고 악기를 배우는 중입니다.<br />제 관심사와 활동이 담긴 이 페이지에 오신 걸 환영합니다.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#/portfolio">활동 보기 <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#/about">더 알아보기 <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-note"><span aria-hidden="true">🎮</span> 게임, 음악, 그리고 새로운 도전!</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-grid" /><div className="art-orbit" /><span className="art-spark">✳</span>
            <div className="floating-label"><span className="status-dot" /> 계속 성장하는 중</div>
            <div className="project-window">
              <div className="window-bar"><span /><span /><span /><p>my-portfolio</p><span className="window-expand">↗</span></div>
              <div className="window-content">
                <span className="window-kicker">HELLO, WORLD!</span>
                <p className="window-title">나다운 것을<br />만들어 가는 일<span>.</span></p>
                <div className="window-scene"><div className="scene-circle" /><div className="scene-stairs"><i /><i /><i /></div><span>↗</span></div>
                <div className="window-footer"><span>CURIOUS MIND, CREATIVE HANDS</span><span>01 / ∞</span></div>
              </div>
            </div>
            <div className="idea-note"><span>NOTE TO SELF</span><p>오늘의 시도가<br />내일의 나를 만든다.</p><span className="note-arrow">⤴</span></div>
            <div className="art-caption">IDEA <span>→</span> MAKE <span>→</span> GROW</div>
          </div>
        </section>
        <div className="section-divider page-width"><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span></div>
        <section className="about-section page-width" id="about" aria-labelledby="about-title">
          <div className="section-heading"><p className="eyebrow">01 / ABOUT ME</p><h2 id="about-title">게임과 음악을<br />좋아하는 학생입니다<span>.</span></h2></div>
          <div className="about-content">
            <h3>안녕하세요,<br />집 가고싶다입니다</h3>
            <p>리그 오브 레전드와 이터널 리턴을 즐기고, 기타와 드럼을 연주하는 것을 좋아합니다. 학교 밴드부에서 활동하며 음악의 즐거움을 느끼고 있습니다.</p>
            <div className="interest-tags"><span># 게임</span><span># 음악</span><span># 악기</span></div>
            <a className="text-link about-more" href="#/about">더 알아보기 <span aria-hidden="true">→</span></a>
          </div>
        </section>
        <section className="work-invitation">
          <div className="page-width work-invitation-inner">
            <div><p className="eyebrow">MY ACTIVITIES</p><h2>어떤 활동을 했을까요<span>?</span></h2><p className="invitation-description">게임과 음악 활동의 이야기를 만나 보세요.</p></div>
            <a className="button button-primary" href="#/portfolio">활동 보기 <span aria-hidden="true">↗</span></a>
          </div>
        </section>
        </>}
        {isAboutPage && <section className="about-page page-width" aria-labelledby="about-page-title">
          <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로 돌아가기</a>
          <div className="about-page-heading">
            <p className="eyebrow">MY STORY / ABOUT ME</p>
            <h1 id="about-page-title" tabIndex={-1}>자기소개<span>.</span></h1>
            <p className="list-description">게임을 즐기고 악기를 배우는 학생의 이야기.</p>
          </div>
          <div className="about-profile">
            <div className="about-profile-art" aria-hidden="true"><span>🎮</span><p>게임, 음악,<br />그리고 새로운 도전</p><div>집 가고싶다</div></div>
            <div className="about-content">
              <h2>안녕하세요,<br />집 가고싶다입니다<span>.</span></h2>
              <p>리그 오브 레전드와 이터널 리턴을 즐기는 게이머이자, 기타와 드럼을 배우는 뮤지션입니다. 게임과 음악 모두에서 성장하기를 원합니다.</p>
              <dl className="about-details">
                <div><dt>관심 있는 것</dt><dd>리그 오브 레전드, 이터널 리턴, 드럼 연주</dd></div>
                <div><dt>잘하는 것</dt><dd>악기 배우기, 기타 연주, 드럼 연주</dd></div>
                <div><dt>앞으로의 목표</dt><dd>재미있게 살면서 새로운 도전을 계속하기</dd></div>
              </dl>
              <a className="button button-primary" href="#/portfolio">활동 보기 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>}
        {isPortfolioPage && <section className="portfolio-section portfolio-page" aria-labelledby="portfolio-title">
          <div className="page-width">
            <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로 돌아가기</a>
            <div className="portfolio-heading"><div><p className="eyebrow">MY ACTIVITIES / EXPERIENCES</p><h1 id="portfolio-title" tabIndex={-1}>활동<span>.</span></h1><p className="list-description">게임과 음악에서 만난 경험들을 모았습니다.</p></div></div>
            <div className="list-summary"><span>전체 프로젝트</span><span>{projects.length.toString().padStart(2, '0')}</span></div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <a className="project-card-link" href={`#/portfolio/${project.style}`} aria-label={`${project.title} 자세히 보기`}>
                    <ProjectArtwork project={project} />
                    <div className="project-category">{project.category}</div>
                    <h3>{project.title}</h3><p>{project.description}</p>
                    <span className="project-read-more">자세히 보기 <span aria-hidden="true">↗</span></span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>}
        {isProjectPage && <section className="project-detail page-width" aria-labelledby="project-title">
          <a className="text-link list-back" href="#/portfolio"><span aria-hidden="true">←</span> 포트폴리오 목록으로</a>
          {selectedProject ? <>
            <header className="detail-heading">
              <p className="eyebrow">PROJECT {selectedProject.number} / {selectedProject.category}</p>
              <h1 id="project-title" tabIndex={-1}>{selectedProject.title}<span>.</span></h1>
              <p className="list-description">{selectedProject.description}</p>
            </header>
            <div className="detail-banner">
              <ProjectArtwork project={selectedProject} className="detail-art" />
              <div className="detail-overview">
                <span className="example-label">실습용 예시</span>
                <h2>프로젝트 소개</h2>
                <p>{selectedProject.overview}</p>
                <p className="detail-example-note">소개와 과정은 예시입니다. 직접 만든 프로젝트의 내용과 이미지로 바꿔 보세요.</p>
              </div>
            </div>
            <div className="detail-story">
              <section className="detail-story-section" aria-labelledby="project-goal"><h2 id="project-goal"><span>01</span> 왜 만들었나요?</h2><p>{selectedProject.goal}</p></section>
              <section className="detail-story-section" aria-labelledby="project-process"><h2 id="project-process"><span>02</span> 어떻게 만들었나요?</h2><ol>{selectedProject.process.map((step) => <li key={step}>{step}</li>)}</ol></section>
              <section className="detail-story-section" aria-labelledby="project-learning"><h2 id="project-learning"><span>03</span> 무엇을 배웠나요?</h2><p>{selectedProject.learning}</p></section>
            </div>
            <div className="detail-bottom"><p>다른 작업도 둘러보세요.</p><a className="button button-primary" href="#/portfolio">목록으로 돌아가기 <span aria-hidden="true">→</span></a></div>
          </> : <div className="project-not-found"><h1 id="project-title" tabIndex={-1}>프로젝트를 찾을 수 없어요.</h1><p>주소를 확인하거나 포트폴리오 목록에서 작업을 선택해 주세요.</p><a className="button button-primary" href="#/portfolio">포트폴리오 목록 보기 <span aria-hidden="true">→</span></a></div>}
        </section>}
      </main>
      <footer className="site-footer page-width"><a className="wordmark" href="#home">최호인<span className="brand-dot">.</span></a><p>감사합니다!</p><button className="back-top" type="button" onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.getElementById('main')?.focus({ preventScroll: true }) }}>맨 위로 <span aria-hidden="true">↑</span></button></footer>
    </>
  )
}

export default App
