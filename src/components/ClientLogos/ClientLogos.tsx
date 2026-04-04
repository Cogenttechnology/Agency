import './ClientLogos.css';

const clients = [
  { name: 'Nav Imperial Hospital', color: '#ff6b6b', bg: 'rgba(255,107,107,0.1)', logo: '' },
  { name: 'Manglam Group',         color: '#6c63ff', bg: 'rgba(108,99,255,0.1)',  logo: '' },
  { name: 'KGK Realty',            color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  logo: '' },
  { name: 'CKS Hospital',          color: '#00d4aa', bg: 'rgba(0,212,170,0.1)',   logo: '' },
  { name: 'Sanjay Textile Store',  color: '#ec4899', bg: 'rgba(236,72,153,0.1)',  logo: '' },
  { name: 'R-Tech Group',          color: '#a855f7', bg: 'rgba(168,85,247,0.1)',  logo: '' },
  { name: 'Kirana King',           color: '#6c63ff', bg: 'rgba(108,99,255,0.1)',  logo: '' },
  { name: 'Shubhashish Group',     color: '#00d4aa', bg: 'rgba(0,212,170,0.1)',   logo: '' },
  { name: 'Saras Dairy',           color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  logo: '' },
  { name: 'Clarks Jaipur',         color: '#ff6b6b', bg: 'rgba(255,107,107,0.1)', logo: '' },
];

const row1 = [...clients, ...clients];
const row2 = [...clients].reverse().concat([...clients].reverse());
const row3 = [...clients, ...clients];

function LogoCard({ name, color, bg, logo }: typeof clients[0]) {
  return (
    <div
      className="cl-card"
      style={{ '--cl-color': color, '--cl-bg': bg } as React.CSSProperties}
    >
      {logo
        ? <img src={logo} alt={name} className="cl-card__img" />
        : <span className="cl-card__name">{name}</span>
      }
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="cl-section">
      {/* Edge fade masks */}
      <div className="cl-fade cl-fade--left" />
      <div className="cl-fade cl-fade--right" />

      <div className="cl-label">
        <span className="cl-label__line" />
        Trusted by leading brands across India
        <span className="cl-label__line" />
      </div>

      <div className="cl-wrapper">
        <div className="cl-track cl-track--fwd">
          {row1.map((c, i) => <LogoCard key={i} {...c} />)}
        </div>
      </div>

      <div className="cl-wrapper">
        <div className="cl-track cl-track--rev">
          {row2.map((c, i) => <LogoCard key={i} {...c} />)}
        </div>
      </div>

      <div className="cl-wrapper">
        <div className="cl-track cl-track--slow">
          {row3.map((c, i) => <LogoCard key={i} {...c} />)}
        </div>
      </div>
    </section>
  );
}
