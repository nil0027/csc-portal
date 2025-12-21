fetch("http://localhost:5000/api/services")
.then(res => res.json())
.then(data => {
  const box = document.getElementById("services");
  data.forEach(s => {
    box.innerHTML += `<div class='service-box'>${s.name}</div>`;
  });
});
