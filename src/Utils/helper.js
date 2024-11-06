export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}


export const getInputStyle = () => `shadow appearance-none border rounded w-full p-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`
export const getLabelStyle = () => `block text-gray-700 text-sm font-bold mb-2`
export const getButtonStyle = (padX =  'px-10') => `${padX} py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`