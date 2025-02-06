import React from 'react';
import "./WalletPage.css";

const WalletPage = () => {
  const openTelegramWallet = () => {
    // Telegram deep link to connect a TON wallet
    window.open('https://t.me/MyTonWalletBot?start=connect_wallet', '_blank');
  };

  return (
    <div style={styles.walletPage} className="gradient-background">
      <div style={styles.contentWrapper}>
        <div style={styles.headerIcon}>
          {/* Uncomment and use if needed: <img src="/assets/icon.png" alt="Icon" /> */}
        </div>
        <h1 style={styles.title}>Wallet</h1>
        <p style={styles.description}>Connect your TON wallet for future rewards</p>
        <button style={styles.connectButton} onClick={openTelegramWallet}>
          Open Wallet in Telegram
        </button>
      </div>
      <div style={styles.footerNav}>
        <div style={styles.footerNavItem}>Home</div>
        <div style={styles.footerNavItem}>Tasks</div>
        <div style={styles.footerNavItem}>Frens</div>
        <div style={styles.footerNavItem}>Activity</div>
        <div style={styles.footerNavItem}>Earn</div>
        <div style={{ ...styles.footerNavItem, ...styles.active }}>Wallet</div>
      </div>
    </div>
  );
};

const styles = {
  walletPage: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'black',
    color: 'white',
    width:'100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Make the page unscrollable
    position: 'fixed',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    textAlign: 'center',
  },
  headerIcon: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#FFFFFF',
  },
  description: {
    fontSize: '16px',
    color: '#CCCCCC',
  },
  connectButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '90%',
    maxWidth: '300px',
    margin: 'auto',
    transition: 'background-color 0.3s',
  },
  footerNav: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px 0',
    backgroundColor: '#1C1C1C',
    borderTop: '1px solid #333333',
  },
  footerNavItem: {
    fontSize: '14px',
    cursor: 'pointer',
    color: '#999999',
    transition: 'color 0.3s',
  },
  active: {
    color: '#61dafb',
  },
  '@media screen and (max-width: 600px)': {
    walletPage: {
      padding: '10px',
    },
    connectButton: {
      fontSize: '14px',
      padding: '10px 20px',
    },
    footerNavItem: {
      fontSize: '12px',
    },
  },
};

export default WalletPage;
