# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

# Vagrant vm configuration
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "generic/ubuntu1904"
    config.vm.network "forwarded_port", guest: 8080, host: 9060
    config.vm.network "forwarded_port", guest: 5580, host: 5580
    config.vm.network "forwarded_port", guest: 5601, host: 5601
    
    config.vm.provision "ansible" do |ansible|
        ansible.playbook = "playbook/provision.yml"
    end  
    
    config.vm.provider :virtualbox do |vb|
        vb.gui = false # change to `true` if you get "Error: Connection timeout." while booting
        vb.memory = 2048 # warning: this is higher than what our production server has
        vb.cpus = 2
        vb.customize [
            'modifyvm', :id,
            '--natdnshostresolver1', 'on',
            "--natdnsproxy1", "on",
            "--nictype1", "virtio"
        ]
    end
  end