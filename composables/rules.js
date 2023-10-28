export function emailRule(value) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return  regex.test(value) || "L'adresse email n'est pas valide !";
}

export function textRule(value) {
    return  !!value || 'Le champ ne doit pas être vide !'
}

export function phoneRule(value) {
    const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/im;
    return  regex.test(value) || "Le numéro de téléphone n'est pas valide !";
}

export function fileRule(value) {
    if(value === null){
        return 'Veuillez sélectionner un fichier !';
    }

    return  !!value ||  'Type de fichier non pris en charge !';
}
