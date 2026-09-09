const SUPABASE_URL = 'https://ycthbfffggvpzpqeetev.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_ukEceMP1fM8R83HYeQuCPA_C17qsQUc'

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const submit_btn = document.getElementById("formulario-login");

submit_btn.addEventListener("submit", submitSubscriptionForm)



function submitSubscriptionForm(event){
    event.preventDefault();

    let senha = event.target['password'].value;
    let email = event.target['email'].value;
    submitSubscription(senha, email)
}

async function submitSubscription(email, senha){

    const { data, error } = await _supabase
        .from('Usuario')
        .insert([ { permissao: false, email: email, senha: senha} ] )
        // .select();

}