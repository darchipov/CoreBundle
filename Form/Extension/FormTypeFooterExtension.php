<?php

namespace Ekyna\Bundle\CoreBundle\Form\Extension;

use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\Exception\InvalidOptionsException;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\OptionsResolver\Options;

/**
 * Class FormTypeFooterExtension
 * @package Ekyna\Bundle\CoreBundle\Form\Extension
 * @author Étienne Dauvergne <contact@ekyna.com>
 */
class FormTypeFooterExtension extends AbstractTypeExtension
{
    /**
     * {@inheritDoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        // Only "root" form with _footer option
        if(!(null === $form->getParent() && array_key_exists('_footer', $options))) {
            return;
        }

        $footerOptions = $this->resolveFooterOptions($options['_footer'], $form);

        $footerOptions['buttons'] = $this->transformButtons($footerOptions['buttons']);

        $view->vars['footer'] = $footerOptions;
    }

    private function transformButtons(array $buttons)
    {
        $transformedButtons = array();
        foreach ($buttons as $button) {
            $attributes = $button['name'] !== null ? array_merge($button['attr'], array('name' => $button['name'])) : $button['attr'];
            $transformedButtons[] = array(
                'label'      => $button['label'],
                'options'    => array(
                    'type'    => $button['type'],
                    'theme'   => $button['theme'],
                    'size'    => 'md',
                    'icon'    => $button['icon'],
                    'path'    => $button['path'],
                ),
                'attributes' => $attributes,
            );
        }
        return $transformedButtons;
    }

    private function resolveFooterOptions(array $options, FormInterface $form)
    {
        $buttonResolver = new OptionsResolver();
        $buttonResolver
            ->setDefaults(array(
                'type'  => 'submit',
                'theme' => 'primary',
                'icon'  => 'ok',
                'name'  => null,
                'path'  => null,
                'attr'  => array(),
            ))
            ->setRequired(array('type', 'label', 'theme', 'icon'))
            ->setOptional(array('name', 'path'))
            ->setAllowedTypes(array(
                'name'  => array('string', 'null'),
                'type'  => 'string',
                'label' => 'string',
                'theme' => 'string',
                'icon'  => 'string',
                'path'  => array('string', 'null'),
                'attr'  => 'array',
            ))
            ->setAllowedValues(array(
                'type'  => array('submit', 'link'),
                'theme' => array('primary', 'default', 'success', 'warning', 'danger'),
            ))
            ->setNormalizers(array(
            	'path' => function(Options $options, $value) {
            	    if ('link' === $options['type'] && 0 === strlen($value)) {
            	        throw new InvalidOptionsException('"path" option is mandatory for "link" type buttons.');
            	    }
            	    return $value;
            	},
            	'name' => function(Options $options, $value) {
            	    if ('link' !== $options['type']) {
            	        if (0 === strlen($value)) {
            	           throw new InvalidOptionsException('"name" option is mandatory for non "link" type buttons.');
            	        }
            	        return $value;
            	    }
            	    return null;
            	}, 
            ))
        ;

        // Submit default button
        $defaultButtons = array(
            'submit' => array(
    	        'type'  => 'submit',
    	        'label' => 'ekyna_core.button.save',
    	        'theme' => 'primary',
    	        'icon'  => 'ok',
    	    )
        );

        // Cancel default button
        $cancelPath = null;
        // Look for _redirect
        if ($form->has('_redirect')) {
            if (0 < strlen($redirect = $form->get('_redirect')->getData())) {
                $cancelPath = $redirect;
            }
        }
        // Cancel path from options
        if (null === $cancelPath && array_key_exists('cancel_path', $options)) {
            $cancelPath = $options['cancel_path'];
        }

        // if cancel path is defined create default button
        if (null !== $cancelPath) {
            $defaultButtons['cancel'] = array(
    	        'type'  => 'link',
    	        'label' => 'ekyna_core.button.cancel',
    	        'theme' => 'default',
    	        'icon'  => 'remove',
                'path' => $cancelPath,
                'attr' => array('class' => 'form-cancel-btn'),
    	    );
        }

        // Merge buttons options
        if (array_key_exists('buttons', $options)) {
            foreach($defaultButtons as $name => $button) {
                if (array_key_exists($name, $options['buttons'])) {
                    $defaultButtons[$name] = array_merge($button, $options['buttons'][$name]);
                }
            }
        }
        $options['buttons'] = $defaultButtons;

        $resolver = new OptionsResolver();
        $resolver
            ->setDefaults(array(
                'offset'      => 2,
            	'buttons'     => $defaultButtons,
            ))
            ->setOptional(array('cancel_path'))
            ->setRequired(array('buttons'))
            ->setAllowedTypes(array(
                'offset'      => 'int',
                'cancel_path' => 'string',
            	'buttons'     => 'array',
            ))
            ->setNormalizers(array(
            	'buttons' => function(Options $options, $buttons) use ($buttonResolver) {
            	    $buttonsOption = array();
            	    foreach($buttons as $name => $button) {
            	        $button['name'] = $name;
            	        $buttonsOption[] = $buttonResolver->resolve($button);
            	    }
            	    return $buttonsOption;
            	}
            ))
        ;

        return $resolver->resolve($options);
    }

    /**
     * {@inheritDoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setOptional(array('_footer'))
            ->setAllowedTypes(array('_footer' => 'array'))
        ;
    }

    /**
     * {@inheritDoc}
     */
    public function getExtendedType()
    {
    	return 'form';
    }
}
