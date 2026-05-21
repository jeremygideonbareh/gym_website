'use client'

import { useEffect } from 'react'

const IMAGES = {
  heroBg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=90&fit=crop',
  heroAthlete: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=90&fit=crop',
  quote: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=90&fit=crop',
  trainer: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=90&fit=crop',
  contactBg: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=90&fit=crop',
  contactRight: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=90&fit=crop',
  card1: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=90&fit=crop',
  card2: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=90&fit=crop',
  card3: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=90&fit=crop',
  card4: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=90&fit=crop',
}

export default function Home() {
  useEffect(() => {
    /* Sticky navbar */
    const navbar = document.getElementById('navbar')
    const scrollHandler = () => {
      if (window.scrollY > 60) {
        navbar?.classList.add('scrolled')
      } else {
        navbar?.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })

    /* Hamburger menu */
    const hamburger = document.getElementById('hamburger')
    const navLinks = document.getElementById('navLinks')
    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('active')
      navLinks?.classList.toggle('open')
    })
    navLinks?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger?.classList.remove('active')
        navLinks?.classList.remove('open')
      })
    })

    /* Parallax hero */
    const heroBg = document.querySelector<HTMLImageElement>('#heroBg img')
    let ticking = false
    const parallaxHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroBg) {
            heroBg.style.transform = 'translateY(' + window.scrollY * 0.4 + 'px)'
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', parallaxHandler, { passive: true })

    /* Counter animation */
    const statNumbers = document.querySelectorAll<HTMLElement>('.stat-number')
    if (statNumbers.length) {
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
      const animateCounter = (el: HTMLElement, target: number, suffix: string, duration: number) => {
        const startTime = performance.now()
        const update = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = easeOutQuart(progress)
          el.textContent = Math.round(eased * target).toLocaleString() + suffix
          if (progress < 1) requestAnimationFrame(update)
        }
        requestAnimationFrame(update)
      }
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement
              const target = parseInt(el.dataset.target || '0', 10)
              const suffix = el.dataset.suffix || ''
              animateCounter(el, target, suffix, 2000)
              counterObserver.unobserve(el)
            }
          })
        },
        { threshold: 0.5 }
      )
      statNumbers.forEach((el) => counterObserver.observe(el))
    }

    /* Scroll reveal */
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    revealElements.forEach((el) => revealObserver.observe(el))

    /* 3D card tilt */
    const cards = document.querySelectorAll<HTMLElement>('.feature-card, .pricing-card')
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.transform =
          'perspective(800px) rotateX(' + -y * 12 + 'deg) rotateY(' + x * 12 + 'deg) scale(1.03)'
        card.style.transition = 'transform 100ms ease'
      })
      card.addEventListener('mouseleave', () => {
        card.style.transform = ''
        card.style.transition = 'transform 400ms ease'
      })
    })

    /* Smooth scroll for anchor links */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
        const targetId = this.getAttribute('href')
        if (!targetId || targetId === '#') return
        const target = document.querySelector(targetId)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })

    return () => {
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('scroll', parallaxHandler)
    }
  }, [])

  return (
    <>
      {/* ═══ NAVBAR ═══ */}
      <nav className="navbar" id="navbar">
        <a href="#" className="nav-brand">
          FitForge Pro
        </a>
        <button className="hamburger" id="hamburger" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className="nav-links" id="navLinks">
          <li>
            <a href="#hero">HOME</a>
          </li>
          <li>
            <a href="#membership">PROGRAMMES</a>
          </li>
          <li>
            <a href="#trainer">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
          <li>
            <a href="#" className="nav-cta">
              DOWNLOAD APP
            </a>
          </li>
        </ul>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="hero" id="hero">
        <div className="hero-bg" id="heroBg">
          <img src={IMAGES.heroBg} alt="Cinematic gym interior with dramatic lighting" />
        </div>

        <div className="hero-shapes">
          <div className="shape shape-circle"></div>
          <div className="shape shape-square"></div>
          <div className="shape shape-circle-2"></div>
        </div>

        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-label">FitForge Pro Coaching</span>
            <h1 className="hero-headline">
              Fitness For
              <br />
              Everyday
              <br />
              Athletes
            </h1>
            <p className="hero-subtitle">
              With expert strength, hypertrophy and nutrition coaching — your transformation starts here.
            </p>
            <button className="hero-cta">Start For Free</button>
          </div>
        </div>

        <div className="hero-right">
          <img src={IMAGES.heroAthlete} alt="Male athlete training with dramatic dark background" />
        </div>
      </section>

      {/* ═══ STAT BAR ═══ */}
      <div className="stat-bar">
        <div className="stat-bar-inner">
          <div className="stat-item">
            <span className="stat-number" data-target="3560" data-suffix="+">
              0
            </span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-target="127" data-suffix="+">
              0
            </span>
            <span className="stat-label">Expert Coaches</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-target="65" data-suffix="+">
              0
            </span>
            <span className="stat-label">Fitness Programs</span>
          </div>
        </div>
      </div>

      {/* ═══ QUOTE ═══ */}
      <section className="quote-section">
        <div className="quote-image reveal-left">
          <img src={IMAGES.quote} alt="Bodybuilder lifting with high contrast lighting" />
        </div>
        <div className="quote-content reveal-right">
          <div className="quote-mark">&ldquo;</div>
          <p className="quote-text">
            SUCCESS USUALLY COMES TO THOSE WHO ARE TOO BUSY TO BE LOOKING FOR IT.
          </p>
          <p className="quote-attribution">&mdash; Henry David Thoreau</p>
        </div>
      </section>

      {/* ═══ FEATURE CARDS ═══ */}
      <section className="feature-section">
        <div className="feature-grid stagger-children">
          {[
            { title: 'Group Exercise Innovations', img: IMAGES.card1, alt: 'Group fitness class in action' },
            { title: 'Good Vibes', img: IMAGES.card2, alt: 'Athlete motivation shot with dramatic lighting' },
            { title: 'Perfectly Balanced Diet', img: IMAGES.card3, alt: 'Clean meal prep on dark surface' },
            { title: 'Find Your Space', img: IMAGES.card4, alt: 'Premium gym interior with equipment' },
          ].map((card, i) => (
            <div className="feature-card reveal" style={{ '--i': i } as React.CSSProperties} key={card.title}>
              <div className="feature-card-image">
                <img src={card.img} alt={card.alt} />
              </div>
              <div className="feature-card-title">{card.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MEMBERSHIP ═══ */}
      <section className="membership-section" id="membership">
        <div className="membership-header reveal">
          <span className="membership-label">Billed Monthly</span>
          <h2 className="membership-title">Membership</h2>
        </div>
        <div className="pricing-grid stagger-children">
          {[
            { name: 'Individual', price: 'Only $9.00/Mo', featured: false },
            { name: 'Pro', price: 'Only $29.00/Mo', featured: true },
            { name: 'Elite 1-on-1', price: 'Only $149.00/Mo', featured: false },
          ].map((plan, i) => (
            <div
              className={'pricing-card reveal' + (plan.featured ? ' featured' : '')}
              style={{ '--i': i } as React.CSSProperties}
              key={plan.name}
            >
              <h3 className="pricing-name">{plan.name}</h3>
              <ul className="pricing-features">
                <li>Access all areas</li>
                <li>Unlimited standard classes</li>
                <li>Health &amp; lifestyle assessment</li>
                <li>Initial personal training session</li>
                <li>Complimentary fit 3D body scan</li>
                <li>Dedicated free members parking</li>
              </ul>
              <button className="pricing-cta">{plan.price}</button>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TRAINER ═══ */}
      <section className="trainer-section" id="trainer">
        <div className="trainer-photo reveal-left">
          <img src={IMAGES.trainer} alt="Certified personal trainer and nutrition coach" />
        </div>
        <div className="trainer-info reveal-right">
          <span className="trainer-label">Meet Your Coach</span>
          <h2 className="trainer-name">Marcus Steele</h2>
          <p className="trainer-title">Certified Personal Trainer &middot; Nutrition Expert</p>
          <p className="trainer-bio">
            With over a decade of experience transforming bodies and minds, Marcus combines evidence-based
            strength training with personalised nutrition protocols. His approach has helped over 500 clients
            break through plateaus and achieve sustainable results. Whether you are a beginner or seasoned
            athlete, Marcus designs programmes that fit your lifestyle and push your limits.
          </p>
          <div className="trainer-badges">
            <span className="badge">NASM Certified</span>
            <span className="badge">10+ Years</span>
            <span className="badge">500+ Clients</span>
            <span className="badge">Online Coach</span>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="contact-section" id="contact">
        <div className="contact-bg">
          <img src={IMAGES.contactBg} alt="Gym equipment dark moody background" />
        </div>
        <div className="contact-content">
          <div className="contact-left reveal">
            <h2 className="contact-heading">Ask Us Anything</h2>
            <p className="contact-desc">Have questions? Fill out the form or reach us directly.</p>
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault()
                alert('Message sent! We will get back to you soon.')
              }}
            >
              <input type="email" placeholder="Email address" required />
              <input type="text" placeholder="Your name" required />
              <button type="submit" className="contact-submit">
                Send Message
              </button>
            </form>
          </div>
          <div className="contact-right reveal">
            <img src={IMAGES.contactRight} alt="Gym equipment interior" />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">FitForge Pro</div>
            <p className="footer-tagline">Forge your best self</p>
          </div>
          <ul className="footer-nav">
            <li>
              <a href="#hero">HOME</a>
            </li>
            <li>
              <a href="#membership">PROGRAMMES</a>
            </li>
            <li>
              <a href="#trainer">ABOUT</a>
            </li>
            <li>
              <a href="#contact">CONTACT</a>
            </li>
          </ul>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 FitForge Pro. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
