let isAdmin = false;
let topupCodes = {};

// ===== LOGIN ADMIN =====
function loginAdmin() {
  const p1 = document.getElementById('admin-pass-1').value;
  const p2 = document.getElementById('admin-pass-2').value;

  if (p1 === '0987654321' && p2 === 'zxcvbnm') {
    isAdmin = true;
    document.getElementById('admin-panel').style.display = 'block';
    alert('✅ Admin đăng nhập thành công');
  } else {
    alert('❌ Sai mật khẩu');
  }
}
