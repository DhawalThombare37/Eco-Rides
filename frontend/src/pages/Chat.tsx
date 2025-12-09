import { useState } from 'react';
import { MessageSquare, Search, Send, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isRead: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for chat users
  const chatUsers: ChatUser[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'Hey, how are you?',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
      lastMessage: 'See you tomorrow!',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      lastMessage: 'Thanks for the ride!',
      lastMessageTime: '2 days ago',
      unreadCount: 1,
    },
  ];

  // Mock messages for each user
  const mockMessages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        content: 'Hey there! Are you still interested in carpooling tomorrow?',
        sender: 'John Doe',
        timestamp: '10:00 AM',
        isRead: true,
      },
      {
        id: '2',
        content: 'Yes, I am! What time works for you?',
        sender: 'You',
        timestamp: '10:05 AM',
        isRead: true,
      },
      {
        id: '3',
        content: 'I can pick you up at 8:30 AM. Is that okay?',
        sender: 'John Doe',
        timestamp: '10:30 AM',
        isRead: true,
      },
    ],
    '2': [
      {
        id: '4',
        content: 'Hi! I saw your ride offer for the weekend.',
        sender: 'Jane Smith',
        timestamp: 'Yesterday',
        isRead: true,
      },
      {
        id: '5',
        content: 'Yes, I have two seats available. Would you like to join?',
        sender: 'You',
        timestamp: 'Yesterday',
        isRead: true,
      },
      {
        id: '6',
        content: 'That would be great! See you tomorrow!',
        sender: 'Jane Smith',
        timestamp: 'Yesterday',
        isRead: true,
      },
    ],
    '3': [
      {
        id: '7',
        content: 'Thanks for the ride yesterday! It was very comfortable.',
        sender: 'Mike Johnson',
        timestamp: '2 days ago',
        isRead: true,
      },
      {
        id: '8',
        content: 'You\'re welcome! Happy to help. Let me know if you need a ride again.',
        sender: 'You',
        timestamp: '2 days ago',
        isRead: true,
      },
    ],
  };

  const handleUserSelect = (user: ChatUser) => {
    setSelectedUser(user);
    setMessages(mockMessages[user.id] || []);
  };

  const filteredUsers = chatUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-green-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex cursor-pointer items-center space-x-3 border-b border-gray-100 p-4 hover:bg-gray-50 ${
                selectedUser?.id === user.id ? 'bg-green-50' : ''
              }`}
              onClick={() => handleUserSelect(user)}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-12 w-12 rounded-full"
                />
                {user.unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                    {user.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-400">{user.lastMessageTime}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {selectedUser ? (
          <>
            <div className="flex items-center border-b border-gray-200 p-4">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="mr-4 h-10 w-10 rounded-full"
              />
              <div>
                <h2 className="font-medium">{selectedUser.name}</h2>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === 'You' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'You'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="mt-1 block text-xs opacity-70">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-gray-200 py-2 px-4 focus:border-green-500 focus:outline-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
                  onClick={handleSendMessage}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-500">
            <MessageSquare className="mb-4 h-12 w-12" />
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat; 