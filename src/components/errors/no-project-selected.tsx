import AlertHint from "../ui/alert/AlertHint";

export function NoProjectSelected() {
  return (
    <AlertHint
      title="No project selected"
      description="Please select a project to continue."
    />
  );
}
