const agenda = new Map<string, string>();

agenda.set("steeven", "318-521-2331");
agenda.set("pangolin", "321-887-0012");
agenda.set("marin", "322-352-0329");
agenda.set("daniel", "310-534-1234");
agenda.set("miguel", "312-021-9534");

console.log(agenda.get("steeven"));
console.log(agenda.get("daniel"));

agenda.delete("pangolin");

agenda.forEach((telefono, nombre) => {
  console.log(`${nombre}: ${telefono}`);
});