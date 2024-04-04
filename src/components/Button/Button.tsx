export function Button({ text }: { text: string }) {
  return (
    <button className='py-2 px-6 text-white bg-blue-500 rounded hover:bg-blue-400 duration-200 ml-2'>
      {text}
    </button>
  );
}
