import OutfitGenerator from "./components/OutfitGenerator";

function App() {
  return (
     <div className="min-h-screen flex flex-col">
    <div className="min-h-screen">
      <OutfitGenerator />
    </div>

    <footer>
      <div className="text-center p-4 bg-purple-600 text-white">
        &copy; OutfitGenerator-ByYaniss. Tous droits réservés.
      </div>
    </footer>
    </div>
  );
}

export default App;
