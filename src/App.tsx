import Form from "./components/form";

function App() {
  return (
    <main className="container">
      <div className="flex flex-col items-center p-24 max-w-screen-lg mx-auto">
        <div className="bg-gray-500 p-12 rounded-md shadow-sm w-full">
          <h1 className="font-bold text-3xl mb-4">Bid dashboard</h1>

          <p className="text-slate-100 text-sm text-center mb-4">
            Enter a bid ID to view the details.
          </p>

          <Form />
        </div>
      </div>
    </main>
  );
}

export default App;
