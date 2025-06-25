const url = import.meta.env.VITE_BACK_URL
export function TraerDatos() {
    return fetch(`${url}/products`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            return data;
        })
}