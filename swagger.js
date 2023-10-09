const authTokens = {
  Admin: 'e220a1b1-cf45-4ccb-a557-ae9216cf231e',
  'david.c@mailinator.com': '3cfab5ee-60ac-4745-98e1-a141fb8f7786',
  'moiz': 'fb557057-b83d-4b11-a4c5-531048f7221a'
};

const keys = Object.keys(authTokens);
const select = document.createElement('select');

select.addEventListener('change', function () {
  window.ui.preauthorizeApiKey('authorization', select.value);
});

for (const element of keys) {
  const option = document.createElement('option');
  const text = document.createTextNode(element);
  option.value = authTokens[element];
  option.appendChild(text);
  select.appendChild(option);
}
select.id = 'myDropdown';

setTimeout(() => {
  const descriptionDiv = document.querySelector('.description');
  descriptionDiv.parentNode.replaceChild(select, descriptionDiv);
  window.ui.preauthorizeApiKey('authorization', authTokens.Admin);
}, 2000);
