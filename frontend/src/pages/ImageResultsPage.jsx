import { useImageSearchStore } from "../stores/useImageSearchStore";

const ImageResultsPage = () => {
  const { results } = useImageSearchStore();

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-6">
      <h1 className="text-2xl font-bold mb-6">Similar Products</h1>

      {results.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {results.map((r) => (
            <div
              key={r.product._id}
              className="bg-gray-800 p-4 rounded-lg shadow hover:scale-105 transition"
            >
              <img
                src={r.product.image}
                className="h-40 w-full object-cover rounded mb-2"
                alt=""
              />
              <h3 className="text-md font-semibold">{r.product.name}</h3>
              <p className="text-sm text-gray-400">${r.product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageResultsPage;
