import Link from "next/link";

const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">
            GPT-<span className="text-secondary">Graz</span>
          </h1>
          <p className="py-6 text-md text-base-content leading-loose">
            GPT-Graz: Your AI-powered tour guide and much more! Powered by
            OpenAI, it enhances your conversations, content creation and much
            more!
          </p>
          <Link href="/chat" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
