"use client";

import { TransitionWrapper } from "@/app/components/TransitionWrapper";
import { humanizeError } from "@/app/lib/http/error";
import { storeProject } from "@/app/lib/http/project";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProjectInput {
    name: string;
    description: string;
    tags: string[];
    repository: string;
    website: string;
}

export default function Page() {
    const router = useRouter();
    const { handleSubmit, register } = useForm<ProjectInput>();
    const [submitting, setSubmitting] = useState(false);

    function onSubmit(data: ProjectInput) {
        setSubmitting(true);

        storeProject({
            name: data.name,
            description: data.description,
            tags: [],
            repository: data.repository,
            website: data.website,
        })
            .then((project) => {
                toast.info("You have successfully created a project.");
                router.push(`/dashboard/projects/${project.uuid}`);
            })
            .catch((error) => toast.error(humanizeError(error)))
            .finally(() => setSubmitting(false));
    }
    
    return (
        <main className="max-w-6xl mx-auto px-8 flex py-24 flex-col justify-center">
            <TransitionWrapper>
                <Link href="/dashboard/projects" className="mb-6 transition duration-500 ease-in-out text-white/50 hover:text-white/70 flex flex-row gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18">
                        </path>
                    </svg>
                    Projects
                </Link>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span>
                            Name
                        </span>
                        <input
                            className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                            placeholder="Name"
                            {...register("name")}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>
                            Description
                        </span>
                        <textarea
                            className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                            placeholder="Description"
                            {...register("description")}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>
                            Repository
                        </span>
                        <input
                            className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                            placeholder="Repository"
                            {...register("repository")}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>
                            Website
                        </span>
                        <input
                            className="rounded-lg px-4 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50"
                            placeholder="Website"
                            {...register("website")}
                        />
                    </div>
                    <div className="self-end">
                        <button disabled={submitting} type="submit" className={clsx("bg-white rounded-lg text-black px-4 py-2", submitting && "bg-opacity-80")}>
                            Submit
                        </button>
                    </div>
                </form>
            </TransitionWrapper>
        </main>
    );
}