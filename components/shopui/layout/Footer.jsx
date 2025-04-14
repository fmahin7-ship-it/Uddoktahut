export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 border-t py-6 mt-auto">
            <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Powered by{" "}
                <span className="font-semibold text-green-600">UddoktaHut</span>
            </div>
        </footer>
    );
}
