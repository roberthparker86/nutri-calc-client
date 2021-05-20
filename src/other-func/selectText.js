export const selectText = (e) => {
  const id = e.target.id;
  const input = document.getElementById(id);
  input.select();
};