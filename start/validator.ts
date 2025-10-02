import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider(
  {
    // Messaggi generali
    'required': 'Il campo {{ field }} è obbligatorio',
    'string': 'Il valore deve essere una stringa di testo',
    'email': 'Inserisci un indirizzo email valido',
    'minLength': 'Il campo {{ field }} deve avere almeno {{ min }} caratteri',
    'maxLength': 'Il campo {{ field }} non può superare {{ max }} caratteri',
    'database.unique': 'Il valore del campo {{ field }} è già in uso',
    'date': 'Il campo {{ field }} deve essere una data valida',
    'enum': 'Il valore selezionato per {{ field }} non è valido',
    'number': 'Il campo {{ field }} deve essere un numero',
    'positive': 'Il campo {{ field }} deve essere un numero positivo',
    
    // Messaggi utenti
    'name.required': 'Il campo nome è obbligatorio',
    'email.required': 'Il campo email è obbligatorio',
    'email.database.unique': 'Questa email è già registrata',
    'password.required': 'Il campo password è obbligatorio',
    'password.minLength': 'La password deve avere almeno {{ min }} caratteri',
    
    // Messaggi deadlines
    'title.required': 'Il titolo della deadline è obbligatorio',
    'title.minLength': 'Il titolo deve avere almeno {{ min }} caratteri',
    'title.maxLength': 'Il titolo non può superare {{ max }} caratteri',
    'description.minLength': 'La descrizione deve avere almeno {{ min }} caratteri',
    'due_at.required': 'La data di scadenza è obbligatoria',
    'due_at.date': 'Inserisci una data di scadenza valida',
    'remind_at.date': 'Inserisci una data di promemoria valida',
    'status.required': 'Lo stato è obbligatorio',
    'status.enum': 'Lo stato deve essere: pending, completed o cancelled',
    'repeat.enum': 'La ripetizione deve essere: none, daily, weekly, monthly o yearly',
    'user_id.required': "L'ID utente è obbligatorio",
    'user_id.number': "L'ID utente deve essere un numero",
    'user_id.positive': "L'ID utente deve essere valido",
  },
  {
    name: 'nome',
    email: 'email',
    password: 'password',
    title: 'titolo',
    description: 'descrizione',
    dueAt: 'data di scadenza',
    remindAt: 'data promemoria',
    status: 'stato',
    repeat: 'ripetizione',
    user_id: 'utente',
  }
)