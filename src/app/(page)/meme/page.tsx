export interface Meme {
    id: number;
    title: string;
    description: string;
    videoSrc: string; // This will be the path to the video in the `public` folder
}

export const memeCollection: Meme[] = [
    {
        id: 1,
        title: "This Is Fine",
        description: "When you're in denial about the chaos around you.",
        videoSrc: "/memes/this-is-fine.mp4",
    },
    {
        id: 2,
        title: "Distracted Boyfriend",
        description: "The classic representation of new temptations.",
        videoSrc: "/memes/distracted-boyfriend.mp4",
    },
    {
        id: 3,
        title: "Two Guys on a Bus",
        description: "Two different perspectives on the same situation.",
        videoSrc: "/memes/two-guys-on-a-bus.mp4",
    },
    // Add more memes here...
];

export default function MemesPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-12">
                The Ultimate Meme Collection
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {memeCollection.map((meme) => (
                    <div
                        key={meme.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    >
                        {/* The Video Player */}
                        <video
                            src={meme.videoSrc}
                            width="100%"
                            loop
                            controls // Shows default play/pause, volume controls
                            muted     // Often necessary for autoplay to work in browsers
                            autoPlay  // Optional: makes the video play on load
                            playsInline // Important for iOS to prevent fullscreen
                            className="w-full object-cover h-64" // Styling the video element
                        >
                            Your browser does not support the video tag.
                        </video>

                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{meme.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                {meme.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}