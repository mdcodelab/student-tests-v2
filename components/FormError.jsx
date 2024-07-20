

function FormError({message}) {
    if(message) {
        return <h1 className="bg-red-300 rounded py-2">{message}</h1>;
    }
}

export default FormError
