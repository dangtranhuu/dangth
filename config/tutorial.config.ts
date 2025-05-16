// tutorial.config.ts
export interface TutorialConfigItem {
  text: string
  link?: string           // Nếu là trang cụ thể
  icon?: string
  children?: TutorialConfigItem[]
  collapsible?: boolean   // true = có thể đóng/mở, false = luôn mở nếu có children
}

export const tutorialSidebar: TutorialConfigItem[] = [
  {
    text: "Welcome",
    link: "/tutorial/welcome",
    icon: "fa-home"
  },
  {
    text: "Interviews",
    collapsible: true, // dropdown
    children: [
      {
        text: "Java Core",
        collapsible: true, // dropdown tiếp
        children: [
          { text: "Java Basic", link: "/tutorial/java-basic" },
          { text: "Collection", link: "/tutorial/collection" },
          { text: "Concurrency", link: "/tutorial/concurrency" },
        ]
      },
      { text: "Interview Question", link: "/tutorial/interview-question" }
    ]
  },
  {
    text: "NoSQL",
    collapsible: false,
    children: [
      { text: "MongoDB", link: "/tutorial/mongodb" },
      { text: "Redis", link: "/tutorial/redis" },
    ]
  },
  {
    text: "OOP",
    link: "/tutorial/oop"
  }
]
