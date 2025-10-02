import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider(
  {
    // Messaggi generali per tutte le regole
    'required': 'Il campo {{ field }} è obbligatorio',
    'string': 'Il valore deve essere una stringa di testo',
    'email': 'Inserisci un indirizzo email valido',
    'minLength': 'Il campo {{ field }} deve avere almeno {{ min }} caratteri',
    'database.unique': 'Il valore del campo {{ field }} è già in uso',
    
    // Messaggi specifici per campo
    'name.required': 'Il campo nome è obbligatorio',
    'email.required': 'Il campo email è obbligatorio',
    'email.database.unique': 'Questa email è già registrata',
    'password.required': 'Il campo password è obbligatorio',
    'password.minLength': 'La password deve avere almeno {{ min }} caratteri',
  },
  {
    name: 'nome',
    email: 'email',
    password: 'password',
  }
)