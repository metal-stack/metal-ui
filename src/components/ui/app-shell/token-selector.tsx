import { useAuth } from "@/providers/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  IconChevronDown,
  IconKey,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { AddTokenDialog } from "./add-token-dialog";
import { toast } from "sonner";

export function TokenSelector() {
  const { allTokens, activeTokenId, switchToken, removeToken } =
    useMultiToken();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleRemove = (id: string, name: string) => {
    removeToken(id);
    toast.success("Token removed", {
      description: `${name} has been removed.`,
    });
  };

  const previewToken = (token: string): string => {
    if (token.length <= 8) return token;
    return token.slice(0, 8) + "...";
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between font-normal"
            >
              <span className="flex items-center gap-2 truncate">
                <IconKey className="size-4 shrink-0" />
                {activeTokenId
                  ? (allTokens.find((t) => t.id === activeTokenId)?.name ??
                    "No token")
                  : "No token"}
              </span>
              <IconChevronDown className="size-3 shrink-0 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[220px]">
            {allTokens.map((token) => (
              <DropdownMenuItem
                key={token.id}
                className={token.id === activeTokenId ? "bg-input" : ""}
                onClick={() => switchToken(token.id)}
              >
                <span className="flex-1 truncate">{token.name}</span>
                <span className="text-xs text-muted-foreground">
                  {previewToken(token.token)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 -mr-2 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(token.id, token.name);
                  }}
                >
                  <IconTrash className="size-3" />
                </Button>
              </DropdownMenuItem>
            ))}

            {allTokens.length > 0 && <DropdownMenuSeparator />}

            <DropdownMenuItem
              className="text-primary"
              onClick={() => setAddDialogOpen(true)}
            >
              <IconPlus className="mr-2 size-4" />
              Add token
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AddTokenDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </>
  );
}

// Derive active token ID by matching apiToken in allTokens
function useMultiToken() {
  const { allTokens, switchToken, removeToken, status, apiToken } = useAuth();

  const activeTokenId =
    status === "authenticated"
      ? (allTokens.find((t) => t.token === apiToken)?.id ?? null)
      : null;

  return {
    allTokens,
    activeTokenId,
    switchToken: switchToken!,
    removeToken: removeToken!,
  };
}
