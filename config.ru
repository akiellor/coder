root=File.join(Dir.pwd, 'public'); puts ">>> Serving: #{root}"; run Rack::Directory.new(root);
