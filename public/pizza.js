document.getElementById('eddigipizza').onclick = pizzakLista;

async function pizzakLista() {
    const response = await fetch("/pizzak");
    const pizzak = await response.json();

    var pizzaHTML = "<h1>Az eddigi pizzák listája:</h1>";
    pizzaHTML += `<table id="pizzatabla"><tr><th>Név</th><th>Telefonszám</th><th>Cím</th><th>Fajta</th><th>Liszt</th><th>Méret</th></tr>`;
    for (const egyPizza of pizzak) {
        var sorClass = "közepes";
        if (egyPizza.meret === "alap")
            sorClass = "alap";
        pizzaHTML += `<tr><td>${egyPizza.nev}</td><td>${egyPizza.telefonszam}</td><td>${egyPizza.cim}</td><td>${egyPizza.fajta}</td><td>${egyPizza.liszt}</td>
        <td class=>${sorClass}</td></tr>`;
    }
    pizzaHTML += `</table>`;

    document.getElementById("pizzamut").innerHTML = pizzaHTML;
}

document.getElementById("pizzaform").onsubmit = async function (event) {
    event.preventDefault();
    const nev = event.target.elements.nev.value;
    const telefonszam = event.target.elements.telefonszam.value;
    const cim = event.target.elements.cim.value;
    const kozepesErtek  = event.target.elements.meret.checked;
    const liszt = event.target.elements.liszt.value;
    const fajta = event.target.elements.fajta.value;


    var meret = "alap"
    if( kozepesErtek == true)
    meret = "közepes";


    const res = await fetch("/pizzak", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            nev,
            telefonszam,
            cim,
            meret,
            liszt,
            fajta
        }),
    });

    if (res.ok) {
        pizzakLista();
    } else {
        alert("Server error");
    }
};