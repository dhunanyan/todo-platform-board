rm -rf "/Applications/Task Flow Board.app"
rm -rf "$HOME/Library/Application Support/task-flow-board"
rm -rf "$HOME/Library/Application Support/Task Flow Board"
rm -rf "$HOME/Library/Caches/com.taskflow.board"
rm -rf "$HOME/Library/Logs/task-flow-board"
rm -rf "$HOME/Library/Preferences/com.taskflow.board.plist"
hdiutil detach "/Volumes/Task Flow Board" -force || true
rm -rf release
rm -rf ~/Library/Caches/com.apple.iconservices.store
sudo rm -rf /Library/Caches/com.apple.iconservices.store 2>/dev/null || true