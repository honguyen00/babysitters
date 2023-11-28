//When user click on logout
const logoutBtn = $('#logout');

const handleLogout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.status);
      }
}

logoutBtn.on('click', handleLogout);