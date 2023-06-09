import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { useAddContactsMutation, useGetContactsQuery } from 'redux/contactsApi';
const Form = () => {
  const { data: contacts = [] } = useGetContactsQuery();
  const [addContacts] = useAddContactsMutation();
  const nameId = nanoid();
  const numberId = nanoid();

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = e.currentTarget.elements;
    contacts.some(contact => contact.number === number.value)
      ? toast.error(`${number.value} - already in contact`)
      : addContacts({ name: name.value, number: number.value });
    e.currentTarget.reset();
  };
  return (
    <div className="max-w-sm ml-5 mb-5 border-solid border-2">
      <form onSubmit={handleSubmit} className="m-5 flex flex-col">
        <label htmlFor={nameId} className="font-mono text-slate-400">
          Name
        </label>
        <input
          id={nameId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          autoComplete="off"
          className="mt-2 mb-2 pl-1 max-w-xs rounded border border-cyan-700 focus:border-cyan-500 focus:shadow-lg outline-none"
        />
        <label htmlFor={numberId} className="font-mono text-slate-400">
          Number
        </label>
        <input
          id={numberId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          autoComplete="off"
          className="mt-2 mb-2 pl-1 max-w-xs rounded border border-cyan-700 focus:border-cyan-500 focus:shadow-lg outline-none"
        />
        <button
          className="bg-cyan-700 rounded max-w-[50%] text-white hover:bg-cyan-500 hover:text-black hover:shadow-lg"
          type="submit"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default Form;
