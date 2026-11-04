import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { IconSend, IconSparkles2 } from "@tabler/icons-react";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
  Title,
} from "@mantine/core";

export function ChatInterface() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mockedStreaming, setMockedStreaming] = useState(false);

  const { messages, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading =
    status === "streaming" || status === "submitted" || mockedStreaming;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    // sendMessage({ text: input });
    //TODO: Remove mocked response and use real API
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        parts: [{ type: "text", text: input }],
      },
    ]);
    setMockedStreaming(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "This is a mocked response from the AI assistant. How can I assist you further?",
            },
          ],
        },
      ]);
      setMockedStreaming(false);
    }, 1500);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Stack
      gap={0}
      h="calc(100dvh - var(--app-shell-header-height) - 2 * var(--app-shell-padding))"
    >
      <ScrollArea flex={1} px="md" py="lg">
        {messages.length === 0 ? (
          <Center h="100%" mih={300}>
            <Stack align="center" gap="xs">
              <ThemeIcon size={64} radius="xl" variant="light" color="gray">
                <IconSparkles2 size={32} />
              </ThemeIcon>
              <Title order={2} size="h3">
                How can I help you today?
              </Title>
              <Text c="dimmed" maw={420} ta="center">
                Ask me anything about your metal-stack infrastructure.
              </Text>
            </Stack>
          </Center>
        ) : (
          <Stack maw={768} mx="auto" gap="lg">
            {messages.map((message) => (
              <Group
                key={message.id}
                align="flex-start"
                wrap="nowrap"
                justify={message.role === "user" ? "flex-end" : "flex-start"}
              >
                {message.role === "assistant" && (
                  <Avatar size="md" color="metal" variant="filled">
                    AI
                  </Avatar>
                )}
                <Paper
                  px="md"
                  py="xs"
                  maw="80%"
                  bg={
                    message.role === "user"
                      ? "var(--mantine-primary-color-filled)"
                      : "var(--mantine-color-default-hover)"
                  }
                  c={message.role === "user" ? "black" : undefined}
                >
                  <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                    {message.parts.map((part, index) =>
                      part.type === "text" ? (
                        <span key={index}>{part.text}</span>
                      ) : null,
                    )}
                  </Text>
                </Paper>
                {message.role === "user" && (
                  <Avatar size="md" color="gray">
                    MA
                  </Avatar>
                )}
              </Group>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <Group align="flex-start" wrap="nowrap">
                <Avatar size="md" color="metal" variant="filled">
                  AI
                </Avatar>
                <Paper px="md" py="xs" bg="var(--mantine-color-default-hover)">
                  <Loader size="xs" type="dots" />
                </Paper>
              </Group>
            )}
            <div ref={messagesEndRef} />
          </Stack>
        )}
      </ScrollArea>

      <Box
        p="md"
        style={{ borderTop: "1px solid var(--mantine-color-default-border)" }}
      >
        <form onSubmit={handleSubmit}>
          <Stack maw={768} mx="auto" gap="xs">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              autosize
              minRows={1}
              maxRows={6}
              rightSectionPointerEvents="all"
              rightSection={
                <ActionIcon
                  type="submit"
                  loading={isLoading}
                  disabled={!input.trim()}
                  aria-label="Send message"
                >
                  <IconSend size={16} />
                </ActionIcon>
              }
            />
            <Text size="xs" c="dimmed" ta="center">
              Press Enter to send, Shift+Enter for new line
            </Text>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
