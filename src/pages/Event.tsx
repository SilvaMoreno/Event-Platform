import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";
import { Video } from "../Components/Video";

export function Event() {
  const navigate = useNavigate();

  const { slug } = useParams<{
    slug: string;
  }>();

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (!uid) {
      navigate("/");
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug ? <Video lessonSlug={slug} /> : <div className="flex-1"></div>}
        <Sidebar />
      </main>
    </div>
  );
}
