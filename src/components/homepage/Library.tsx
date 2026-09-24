import { TApp } from "@/types/apps.type";

const getAllLibrary = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    const data = await res.json();
    return data;
}

const Library = async () => {
    const data = await getAllLibrary();
    console.log(data, "data");
    return (
        <div className="flex gap-2 container mx-auto">
            <div >
                <h2>THE LIBRARY</h2>
                <p>Twelve lifts covering every major muscle group.</p>
            </div>

            {/* Display data via card */}


            <div>
                {
                    data.map((app: TApp, ind: number) => {
                        return (
                            <div key={ind}>
                                <h3>{app.name}</h3>
                            </div>
                        )

                    })
                }
            </div>

        </div>
    );
};

export default Library;