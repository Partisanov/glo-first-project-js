const carsSelect = document.getElementById('cars');

const renderSelect = (brands) => {
    carsSelect.insertAdjacentHTML('beforeend', `
        <option selected disabled>Выберите тачку</option>
    `);
    brands.forEach(item => {
        carsSelect.insertAdjacentHTML('beforeend', `
        <option value='${item}'>${item}</option>
    `);
    });
};

const render = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const brands = new Set();

            data.cars.forEach(item => {
                brands.add(item.brand);
            });

            renderSelect(brands);
        })
        .catch(error => console.log(error.message));
};

try {
    carsSelect.addEventListener('change', (e) => {
        const brand = e.target.value;
        const infoBlock = document.getElementById('info-wrap');

        const renderInfo = (url, brand) => {
            fetch(url)
                .then(res => res.json())
                .then((data) => {
                    data.cars.forEach(item => {
                        if (item.brand === brand) {
                            infoBlock.innerHTML = '';
                            infoBlock.insertAdjacentHTML('beforeend', `
                            <p>Тачка ${item.brand} ${item.model}</p>
                            <p>Цена: ${item.price}$</p>
                            `);
                        }
                    });
                })
                .catch(error => console.log(error.message));

        };
        renderInfo('./db.json', brand);

    });

    render('./db.json');

} catch (error) {
    console.log(error.message);

}

