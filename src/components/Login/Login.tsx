export default function Login() {

  const handleClick = () => { 
    const CALLBACK_URL = import.meta.env.VITE_COGNITO_CALL_BACK_URL;
    const VITE_COGNITO_DOMAIN_NAME = import.meta.env.VITE_COGNITO_DOMAIN_NAME;
    const VITE_COGNITO_REGION = import.meta.env.VITE_COGNITO_REGION;
    const VITE_COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
    window.location.href = `https://${VITE_COGNITO_DOMAIN_NAME}.auth.${VITE_COGNITO_REGION}.amazoncognito.com/login?client_id=${VITE_COGNITO_CLIENT_ID}&response_type=code&scope=email+openid+phone&redirect_uri=${CALLBACK_URL}`;
  }
  return (
    <div className="min-h-screen bg-[#ede1da] flex flex-col items-center justify-start py-16">
      <h1 className="font-bold mb-8">  {/* Changed from mb-20 to mb-32 for more space */}
        <span className="text-[6rem] text-[#ecd3c2] font-semibold">Dev</span>
        <span className="text-[6rem] text-[#a94b63] font-bold">Drills</span>
      </h1>
      
      <h2 className="text-[3rem] text-[#1d3956] font-medium mt-6 mb-20">
        Practice Data Structures and Algorithms
      </h2>
      
            
      <button 
      onClick={() => handleClick()}
      className="flex items-center gap-2 bg-red-600 text-white-700 font-medium text-lg mx-10 my-10 rounded-lg shadow-md hover:shadow-lg border border-gray-300 hover:bg-red-500 transition p-4">        
        Login with Email
      </button>
    </div>
  );
}
