import { HomeIcon } from "@heroicons/react/24/outline";

export const navigationData = [
	{ name: "Dashboard", href: "/", icon: HomeIcon, current: false },
	// { name: "Team", href: "#", icon: UsersIcon, current: false },
	// { name: "Projects", href: "#", icon: FolderIcon, current: false },
	// { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
	// { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
	// { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];

export const listsData = [
	{ id: 1, name: "Questions", href: "/questions", initial: "Q", current: false },
	{ id: 2, name: "Add Question", href: "/add-question", initial: "A", current: false },
	// { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
