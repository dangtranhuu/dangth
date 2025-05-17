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
    text: "Technical",
    collapsible: false, // dropdown
    children: [
      {
        text: "Java Core",
        icon: "FaJava",
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
    text: "Tool",
    collapsible: false, // dropdown
    children: [
      {
        text: "Git",
        icon: "FaGitAlt",
        collapsible: true, // dropdown tiếp
        children: [
          { text: "Setup môi trường", link: "/tutorial/tools/git/setup" },
          { text: "Đẩy code lên GitHub", link: "/tutorial/tools/git/push-code" },
          { text: "Undo khi gặp một commit sai", link: "/tutorial/tools/git/undo-commit" },
          { text: "Làm việc nhóm", link: "/tutorial/tools/git/collaborators" },
          { text: "Làm việc với nhánh", link: "/tutorial/tools/git/branch" },
        ]
      },
      { text: "Interview Question", link: "/tutorial/interview-question" }
    ]
  },
  {
    text: "OOP",
    link: "/tutorial/oop"
  }
]
