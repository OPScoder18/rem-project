// JavaScript for interactivity
document.querySelectorAll('.bot-option').forEach(bot => {
    bot.addEventListener('click', () => {
      alert(`You selected ${bot.innerText}`);
    });
  });
  
  
  document.querySelector('.toggle-sidebar-btn').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('show');
  });
  