// Check your wise-paass DataCenter（sa, hz）first

// sa center
const ssoUri = 'https://portal-sso-ensaas.sa.wise-paas.com';
const apiBase = 'https://api-sso-ensaas.sa.wise-paas.com';
const redirectUri =
  'https://sso-frontend-guanchen-hou-assignment-eks004.sa.wise-paas.com/index.html';

// hz center
/* const ssoUri =
  'https://portal-sso-ensaas.hz.wise-paas.com.cn';
const apiBase =
  'https://api-sso-ensaas.hz.wise-paas.com.cn';
const redirectUri =
  'https://sso-frontend-GuanChen-Hou-assignment-eks006.hz.wise-paas.com.cn/index.html';
 */


$('#signInBtn').click(function () {
  window.location.href = ssoUri + '/home/sign-in?redirectUri=' + redirectUri;
});

$('#signOutBtn').click(function () {
  $.ajax({
    url: apiBase + '/v4.0/auth',
    method: 'DELETE',
    xhrFields: {
      withCredentials: true
    }
  }).done(function (user) {
    alert('You have logged out!');
  }).fail(function () {
    alert('Logging out failed!');
  });
});

$('#checkLogin').click(function () {
  $.ajax({
    url: apiBase + '/v4.0/users/me',
    method: 'GET',
    xhrFields: {
      withCredentials: true
    }
  }).done(function (user) {
    alert('Hello! ' + user.firstName + ' ' + user.lastName + '!');
  }).fail(function () {
    alert('You are not logged in!');
  });
});
