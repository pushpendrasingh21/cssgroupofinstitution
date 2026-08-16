import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="topbar"><div class="container topbar-inner"><span>Admissions Open • 2026–27</span><span>Quality Education • Bright Future Tomorrow</span></div></div>
    <header class="header" [class.scrolled]="scrolled()">
      <div class="container nav-wrap">
        <a class="brand" routerLink="/" (click)="closeMenu()">
          <img src="assets/logo.png" alt="CSS Group of Institutions logo" />
          <span><b>CSS GROUP</b><small>OF INSTITUTIONS</small></span>
        </a>
        <button class="menu" type="button" (click)="menuOpen.update(v => !v)" aria-label="Toggle navigation">☰</button>
        <nav [class.open]="menuOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMenu()">Home</a>
          <a routerLink="/about" routerLinkActive="active" (click)="closeMenu()">About</a>
          <a routerLink="/courses" routerLinkActive="active" (click)="closeMenu()">Courses</a>
          <a routerLink="/admissions" routerLinkActive="active" (click)="closeMenu()">Admissions</a>
          <a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a>
          <a class="nav-cta" routerLink="/enquiry" (click)="closeMenu()">Enquire Now <span>→</span></a>
        </nav>
      </div>
    </header>
    <main><router-outlet /></main>
    <footer class="footer">
      <div class="container footer-grid">
        <div><img class="footer-logo" src="assets/logo.png" alt="CSS Group logo"><p>Empowering students with quality education, practical skills and career-focused learning.</p></div>
        <div><h4>Quick Links</h4><a routerLink="/about">About Us</a><a routerLink="/courses">Courses</a><a routerLink="/admissions">Admissions</a><a routerLink="/enquiry">Enquiry</a></div>
        <div><h4>Contact</h4><p>📞 7054056745<br>📞 9540498925</p><p>✉ cssgroupofinstitution@gmail.com</p><p>🌐 cssedu.co.in</p></div>
        <div><h4>Campus</h4><p>Shankargarh Patahat Road<br>Near Sardar Patel School<br>Patahat Tiraha, Madhya Pradesh 486220</p></div>
      </div>
      <div class="footer-bottom">© 2026 CSS Group of Institutions. All Rights Reserved.</div>
    </footer>
    <a class="floating-enquiry" routerLink="/enquiry">Enquire Now <span>↗</span></a>
  `,
  styles: [`
    :host{display:block}.topbar{background:#06183b;color:#fff;font-size:.78rem}.topbar-inner{display:flex;justify-content:space-between;padding:8px 20px;letter-spacing:.02em}.header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.97);backdrop-filter:blur(14px);border-bottom:1px solid #e9edf5;transition:.2s}.header.scrolled{box-shadow:0 8px 30px rgba(8,26,62,.08)}.nav-wrap{height:82px;display:flex;align-items:center;justify-content:space-between}.brand{display:flex;align-items:center;gap:10px;color:#06183b;text-decoration:none}.brand img{width:60px;height:60px;object-fit:contain}.brand span{display:flex;flex-direction:column;line-height:1}.brand b{font-size:1.05rem;letter-spacing:.08em}.brand small{margin-top:5px;font-size:.6rem;letter-spacing:.16em;color:#a76a00}.menu{display:none;border:0;background:none;font-size:1.7rem;color:#06183b}nav{display:flex;align-items:center;gap:6px}nav a{color:#24314d;text-decoration:none;font-weight:700;padding:12px 13px;border-radius:10px;font-size:.9rem}nav a:hover,nav a.active{color:#a86b00;background:#fff7e7}.nav-cta{background:#06183b!important;color:#fff!important;border-radius:999px!important;padding:12px 19px!important}.nav-cta span{color:#f6b51c}.footer{background:#06183b;color:#dfe7f7;margin-top:80px}.footer-grid{display:grid;grid-template-columns:1.3fr .8fr 1fr 1.2fr;gap:40px;padding:55px 20px}.footer-logo{width:90px;background:#fff;border-radius:18px;padding:6px}.footer p{line-height:1.7;color:#b8c5dc}.footer h4{color:#fff;margin:0 0 16px}.footer a{display:block;color:#cbd5e7;text-decoration:none;margin:9px 0}.footer a:hover{color:#f6b51c}.footer-bottom{border-top:1px solid rgba(255,255,255,.1);text-align:center;padding:18px;font-size:.82rem;color:#aebbd2}.floating-enquiry{position:fixed;right:20px;bottom:20px;z-index:45;background:#e7a916;color:#06183b;text-decoration:none;font-weight:900;padding:14px 19px;border-radius:999px;box-shadow:0 12px 30px rgba(0,0,0,.2)}@media(max-width:900px){.menu{display:block}nav{display:none;position:absolute;top:82px;left:0;right:0;background:#fff;padding:15px 20px 20px;box-shadow:0 20px 30px rgba(8,26,62,.1);flex-direction:column;align-items:stretch}nav.open{display:flex}.topbar-inner span:last-child{display:none}.footer-grid{grid-template-columns:1fr 1fr}}@media(max-width:560px){.brand img{width:52px;height:52px}.brand b{font-size:.9rem}.footer-grid{grid-template-columns:1fr}.floating-enquiry{right:12px;bottom:12px}}
  `]
})
export class AppComponent {
  menuOpen = signal(false); scrolled = signal(false);
  @HostListener('window:scroll') onScroll(){ this.scrolled.set(window.scrollY > 8); }
  closeMenu(){ this.menuOpen.set(false); }
}
